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
                    current_in: null,
                    department_uid: null,
                    position_uid: null
                }
            },
            inputs: {
                uid: null,
                time_in: null,
                time_out: null,
                shift_start: null,
                shift_end: null,
                notes: null
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
    resetInputs(state) {
        const defaultState = getDefaultState();
        state.state = {
            ...state.state, 
            inputs: defaultState.state.inputs
        };
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
            const res = await this.$axios.get(`/${app.getOrgUID}/attendances`, { 
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

    async fetchByUID({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            const res = await this.$axios.get(`${app.getOrgUID}/attendances/${payload}`);
            commit('setState', { handle: 'state', key: 'inputs', value: res.data.response });
            app.$nextTick(() => {
                app.findPageComponent('EmoloyeeTimeAdjustmentForm').$refs.adjustmentmodal.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async saveAdjustment({ state, commit }) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`/${app.getOrgUID}/attendances/${state.state.inputs.uid}`, state.state.inputs);
            commit('updateEntryDataResponse', res.data.response);
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            throw $e;
        }
    },
};