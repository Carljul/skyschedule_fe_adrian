import defaults from "~/defaults.js";
import Vue from "vue";
import __get from "lodash.get";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            entry: {
                loading: false,
                data: [],
                pagination: {},
                filter: {
                    page: 1,
                    limit: defaults.limit,
                    range: {},
                    query: null,
                    status: null,
                    department_uid: null,
                    position_uid: null
                }
            }
        }
    }
};


// state
export const state = () => getDefaultState();

// mutations
export const mutations = {
    setState(state, payload) {
        Vue.set(__get(state, payload.handle), payload.key, payload.value);
    },
    updateEntryDataResponse(state, payload) {
        const itemIndex = state.state.entry.data.findIndex(x => x.uid === payload.uid);
        Vue.set(state.state.entry.data, itemIndex, payload);
    },
};

// actions
export const actions = {
    async fetchEntry({ state, commit }) {
        const app = this._vm;
        if(state.state.entry.loading) { return; }
        try {
            commit('setState', { handle: 'state.entry', key: 'loading', value: true });
            const res = await this.$axios.get(`/${app.getOrgUID}/overtimes`, { 
                params: {
                    ...state.state.entry.filter,
                    ...state.state.entry.filter.range
                }
            });
            commit('setState', { handle: 'state.entry', key: 'data', value: res.data.data });
            commit('setState', { handle: 'state.entry', key: 'pagination', value: res.data.pagination });
            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
        } catch($e) {
            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
            throw $e;
        }
    },


    async saveEntry({ commit }, payload) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`/${app.getOrgUID}/overtimes/${payload.uid}`, payload);
            commit('updateEntryDataResponse', res.data.response);
        } catch($e) {
            throw $e;
        }
    },
};