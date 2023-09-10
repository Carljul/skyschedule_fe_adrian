import Vue from "vue";
import __get from "lodash.get";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            attendance: {},
            entry: {
                loading: false,
                data: []
            },
            inputs: {
                uid: null,
                attendance_uid: null,
                time_in: null,
                time_out: null,
                notes: null,
                is_overbreak: 0,
                type: null
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
            const res = await this.$axios.get(`/${app.getOrgUID}/attendances/${state.state.attendance.uid}/breaks`, { 
                params: {
                    ...state.state.entry.filter
                }
            });
            commit('setState', { handle: 'state.entry', key: 'data', value: res.data });
            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
        } catch($e) {
            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
            throw $e;
        }
    },

    async fetchByUID({state, commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            const res = await this.$axios.get(`${app.getOrgUID}/attendances/${state.state.attendance.uid}/breaks/${payload}`);
            commit('setState', { handle: 'state', key: 'inputs', value: res.data.response });
            app.$nextTick(() => {
                app.findPageComponent('EmployeeTimesheetBreaksForm').$refs.adjustmentmodal.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async saveAdjustment({ state, commit }) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`/${app.getOrgUID}/attendances/${state.state.attendance.uid}/breaks/${state.state.inputs.uid}`, {
                ...state.state.inputs,
                is_overbreak: state.state.inputs.is_overbreak ? 1 : 0
            });
            commit('updateEntryDataResponse', res.data.response);
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            throw $e;
        }
    },

    async removeEntry({ state, dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`/${app.getOrgUID}/attendances/${state.state.attendance.uid}/breaks/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            throw $e;
        }
    }
};