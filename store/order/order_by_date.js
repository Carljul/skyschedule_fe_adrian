import defaults from "~/defaults.js";
import Vue from "vue";
import __get from "lodash.get";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            inputs: {
                name: ''
            },
            selected: null,
            entry: {
                data: [],
                loading: false,
                pagination: {},
                filter: {
                    query: new Date(),
                    page: 1,
                    limit: defaults.limit,
                    with_trashed: null,
                    only_trashed: null,
                }
            }
        },
        print: null,
        statuses: null
    }
};


// state
export const state = () => getDefaultState();

// mutations
export const mutations = {
    setState(state, payload) {
        state.state = {
            ...state.state,
            ...payload
        };
    },
    resetInputs(state) {
        const defaultState = getDefaultState();
        state.state = {...state.state, inputs: defaultState.state.inputs};
    },
    updateEntryDataResponse(state, payload) {
        Vue.set(state.state.entry.data, payload[0].order_id, payload);
    },
    setToPrint(state, data) {
        state.print = data
    },
    setStatuses(state, data) {
      state.statuses = data
    }
}

const groupedData = (data) => {
  // Use reduce to group the data by order_id
  return data.reduce((acc, item) => {
    const orderId = item.order_id;
    if (!acc[orderId]) {
      // If the group does not exist, create it
      acc[orderId] = [];
    }
    // Add the current item to the group
    acc[orderId].push(item);
    return acc;
  }, {});
}

// actions
export const actions = {
    async fetchEntry({ state, commit }) {
        if(state.state.entry.loading) { return; }

        try {
            commit('setState', {
                entry: {
                    ...state.state.entry,
                    loading: true
                }
            });

            const res = await this.$axios.get('/orders/fetch/by_date', {
                params: state.state.entry.filter
            });
            console.log('DATA1',groupedData(res.data.data))
            commit('setState', {
                entry: {
                    ...state.state.entry,
                    data: groupedData(res.data.data),
                    pagination: res.data.pagination,
                    loading: false
                }
            });

            console.log(state.state);


        } catch($e) {
            commit('setState', {
                entry: {
                    ...state.state.entry,
                    loading: false
                }
            });

        }
    },

    async fetchByUID({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            const res = await this.$axios.get(`orders/${payload}`);
            var data = res.data.response;
            if (data.length > 0) {
                commit('setState', { handle: 'state', key: 'inputs', value: data[0]});
                app.$nextTick(() => {
                    app.findPageComponent('MainOrderForm').$refs.adjustmentmodal.open=true;
                });
                return res.data.response;
            }

            return false;
        } catch($e) {
            return false;
        }
    },

    async saveEntry({ state, commit, dispatch }) {
        const app = this._vm;
        try {

        console.log(['state.state.entry.data', state.state.entry.data])
            let res = null
            if(state.state.inputs.order_id) {
                res = await this.$axios.put(`/orders/${state.state.inputs.order_id}`, state.state.inputs);
                commit('updateEntryDataResponse', res.data.response);
                app.notify({ title: 'Saved!', html: 'Status has been saved.' });
            } else {
                res = await this.$axios.post(`/${app.getOrgUID}/orders`, state.state.inputs);
                app.notify({ title: 'Saved!', html: 'Status has been added.' });
                dispatch('fetchEntry');
            }
        } catch($e) {
            throw $e;
        }
    },

    async updateStatusEntryByOrder({ state, commit, dispatch }) {
      const app = this._vm;
      try {
          let res = null
          if(state.state.inputs.order_id) {
              res = await this.$axios.put(`/orders/all/order/${state.state.inputs.order_id}`, state.state.inputs);

              commit('updateEntryDataResponse', res.data.response);
              app.notify({ title: 'Saved!', html: 'Status has been saved.' });
          } else {
              res = await this.$axios.post(`/orders`, state.state.inputs);
              app.notify({ title: 'Saved!', html: 'Status has been added.' });
              dispatch('fetchEntry');
          }
      } catch($e) {
          throw $e;
      }
  },

  async updateStatusEntryByLineItem({ state, commit, dispatch }) {
      const app = this._vm;
      try {
          let res = null
          if(state.state.inputs.line_item_id) {
              res = await this.$axios.put(`/orders/single/${state.state.inputs.line_item_id}`, state.state.inputs);

              commit('updateEntryDataResponse', res.data.response);
              app.notify({ title: 'Saved!', html: 'Status has been saved.' });
          }
      } catch($e) {
          throw $e;
      }
  },

  async removeOrderEntry({ dispatch }, payload) {
      const app = this._vm;
      try {
          await this.$axios.delete(`/orders/delete/all/${payload.order_id}`);
          dispatch('fetchEntry');
      } catch($e) {
          app.errorHandle($e);
      }
  },

  async removeLineItemEntry({ dispatch }, payload) {
      const app = this._vm;
      console.log(['payload', payload])
      try {
          await this.$axios.delete(`/orders/delete/single/${payload.line_item_id}`);
          dispatch('fetchEntry');
      } catch($e) {
          app.errorHandle($e);
      }
  },

    async fetchToPrint({state, commit}, payload) {
        try {
            commit('setState', {
                entry: {
                    ...state.state.entry,
                    loading: true
                }
            });

            let entry = localStorage.getItem('order-entry');

            let filename = new Date().getTime();
            const res = await this.$axios.get(`/orders/print/report`, {
              headers: {
                'Accept': 'application/pdf',
              },
              responseType: 'blob', // Set the responseType to 'blob'
              params: {
                ...(JSON.parse(entry)).filter,
                print: true
              },
            });

            const blob = new Blob([res.data], { type: 'application/pdf' });

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename + '.pdf'; // You can specify the desired filename


            // Do not delete this: This will download as pdf file
            // Trigger a click event on the anchor element
            // link.click();

            // Release the object URL to free up resources
            // window.URL.revokeObjectURL(link.href);

            commit('setState', {
                entry: {
                    ...state.state.entry,
                    loading: false
                }
            });
            commit('setToPrint', link.href);
        } catch (e) {
            commit('setState', {
                entry: {
                    ...state.state.entry,
                    loading: false
                }
            });
        }
    },

    async fetchStatuses({state, commit}) {
      if(state.state.entry.loading) { return; }

      try {
          const res = await this.$axios.get(`/item_status`);
          console.log('Statutes',res.data.data)
          commit('setStatuses', res.data.data);

      } catch($e) {
          commit('setState', {
              entry: {
                  ...state.state.entry,
                  loading: false
              }
          });

      }
    }
};
