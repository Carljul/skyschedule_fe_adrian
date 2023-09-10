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
                    range: {}
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
    }
};

// actions
export const actions = {
    async fetchEntry({ state, commit }) {
        const app = this._vm;
        try {
            commit('setState', { handle: 'state.entry', key: 'loading', value: true });
            const res = await this.$axios.get(`/${app.getOrgUID}/attendances/mytrack`, { 
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
    }
};