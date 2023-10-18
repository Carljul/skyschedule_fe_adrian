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
                    query: '',
                    page: 1,
                    limit: defaults.limit,
                    with_trashed: null,
                    only_trashed: null,
                }
            }
        },
        print: null
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
        const itemIndex = state.state.entry.data.findIndex(x => x && x.id == payload[0].id);
        Vue.set(state.state.entry.data, itemIndex, payload[0]);
    },
    setToPrint(state, data) {
        state.print = data
    }
}

// actions
export const actions = {
    async fetchEntry({ state, commit }) {
        const app = this._vm;
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
            console.log('DATA1',res.data.data)
            commit('setState', {
                entry: {
                    ...state.state.entry,
                    data: res.data.data,
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

    async updateStatusEntry({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            let res = null
            if(state.state.inputs.order_id) {
                res = await this.$axios.put(`/orders/single/${state.state.inputs.order_id}`, state.state.inputs);

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

    async removeEntry({ dispatch }, payload) {

        const app = this._vm;
        try {
            await this.$axios.delete(`/orders/${payload.id}`);
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
    }
};
