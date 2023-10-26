import defaults from "~/defaults.js";
import Vue from "vue";
import __get from "lodash.get";


// state
export const state = () => ({
    state: {
        inputs: {
          max_avail: 0
        },
        selected: null,
        entry: {
            data: [],
            loading: false,
            pagination: {},
            filter: {
                query: '',
                page: 1,
                limit: defaults.limit,
                with_trashed: null,
                only_trashed: null,
            }
        }
    },
    daily: {
        inputs: {
            name: ''
        },
        selected: null,
        entry: {
            data: [],
            loading: false,
            pagination: {},
            filter: {
                query: '',
                page: 1,
                limit: defaults.limit,
                with_trashed: null,
                only_trashed: null,
            }
        }
    },
    weekly: {
        inputs: {
            name: ''
        },
        selected: null,
        entry: {
            data: [],
            loading: false,
            pagination: {},
            filter: {
                query: '',
                page: 1,
                limit: defaults.limit,
                with_trashed: null,
                only_trashed: null,
            }
        }
    },
    totals: {
        data: [],
        loading: false,
        filter: {
            startDate: null,
            endDate: null
        }
    },
    print: null,
    statuses: {}
});

// mutations
export const mutations = {
    setState(state, payload) {
        state.state = {
            ...state.state,
            ...payload
        };
    },
    setDaily(state, payload) {
        state.daily = {
            ...state.daily,
            ...payload
        };
    },
    setWeekly(state, payload) {
        state.weekly = {
            ...state.weekly,
            ...payload
        };
    },
    setTotals(state, payload) {
        state.totals = payload
    },
    setToPrint(state, data) {
        state.print = data
    },
    setStatuses(state, data) {
        state.statuses = data
    }
}

// actions
export const actions = {
    async fetchTotals({ state, commit }, payload) {
        if(state.state.entry.loading) { return; }

        try {
            commit('setState', {
                entry: {
                    ...state.state.entry,
                    loading: true
                }
            });

            const res = await this.$axios.get(`/totals`, {
                params: state.state.entry.filter
            });
            console.log('DATA',res.data.data)
            commit('setState', {
                entry: {
                    ...state.state.entry,
                    data: res.data.data,
                    pagination: res.data.pagination,
                    loading: false
                }
            });


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
            const res = await this.$axios.get(`${app.getOrgUID}/orders/${payload}`);
            commit('setState', { handle: 'state', key: 'inputs', value: res.data.response });
            app.$nextTick(() => {
                app.findPageComponent('MainTotalForm').$refs.adjustmentmodal.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async filterSpecificDate({ state, commit}, payload) {
        if(state.daily.entry.loading) { return; }

        try {
            if (payload.isDaily) {
                const res = await this.$axios.get(`/totals/daily/${payload.selectedDate}`, {
                    params: state.daily.entry.filter
                });
                commit('setDaily', {
                    entry: {
                        ...state.daily.entry,
                        data: res.data.data,
                        pagination: res.data.pagination,
                        loading: false
                    }
                });

                console.log(['data', state.daily])

            } else {
                const res = await this.$axios.get(`/totals/weekly/${payload.selectedDate}`, {
                    params: state.weekly.entry.filter
                });
                console.log('DATA',res.data.data)
                commit('setWeekly', {
                    entry: {
                        ...state.weekly.entry,
                        data: res.data.data,
                        pagination: res.data.pagination,
                        loading: false
                    }
                });
            }

        } catch($e) {
            if (payload.isDaily) {
                commit('setDaily', {
                    entry: {
                        ...state.daily.entry,
                        loading: false
                    }
                });
            } else {
                commit('setWeekly', {
                    entry: {
                        ...state.weekly.entry,
                        loading: false
                    }
                });
            }

        }
    },

    async filterTotalStatuses({ state, commit }) {
        if(state.totals.loading) { return; }

        try {
            const res = await this.$axios.get(`/totals/statuses`, {
                params: state.totals.filter
            });

            console.log(['res', res.data])

            commit('setTotals', res.data);
        } catch($e) {
            commit('setTotals', []);
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

            let entry = localStorage.getItem('total-entry');

            const res = await this.$axios.get(`/totals/print/report`, {
              headers: {
                'Accept': 'application/pdf',
              },
              responseType: 'blob', // Set the responseType to 'blob'
              params: {
                ...(JSON.parse(entry)).filter,
                print: true,
              },
            });

            const blob = new Blob([res.data], { type: 'application/pdf' });

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            let filename = new Date().getTime();
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
        } catch ($e) {
            commit('setState', {
                entry: {
                    ...state.state.entry,
                    loading: false
                }
            });
            throw $e;
        }
    },

    async fetchStatuses({state, commit}) {
        if(state.state.entry.loading) { return; }

        try {
            commit('setState', {
                entry: {
                    ...state.state.entry,
                    loading: true
                }
            });

            const res = await this.$axios.get(`/item_status`);
            console.log('Statutes',res.data.data)
            commit('setStatuses', res.data.data);
            commit('setState', {
                entry: {
                    ...state.state.entry,
                    loading: false
                }
            });

        } catch($e) {

            commit('setState', {
                entry: {
                    ...state.state.entry,
                    loading: false
                }
            });

        }
    },

    async updateMaxAvailable({ state, commit, dispatch }) {
      const app = this._vm;
      try {
          let res = null
          console.log(state.state.inputs)
          if(state.state.inputs.production_maxes_id) {
              res = await this.$axios.put(`/totals/${state.state.inputs.production_maxes_id}`, state.state.inputs);

              commit('updateEntryDataResponse', res.data.response);
              app.notify({ title: 'Saved!', html: 'Max Available has been saved.' });
          } else {
              res = await this.$axios.post(`/orders`, state.state.inputs);
              app.notify({ title: 'Saved!', html: 'Max Available has been added.' });
              dispatch('fetchEntry');
          }
      } catch($e) {
          throw $e;
      }
   },
};
