import Vue from "vue";
import __get from "lodash.get";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            loading: true,
            attendance: null,
            notes: null,
            breakNotes: null
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
    async fetchEntry({ commit }) {
        const app = this._vm;
        if(!app.appIsEmployee) { return; }
        try {
            commit('setState', { handle: 'state', key: 'loading', value: true });
            const res = await this.$axios.get(`${app.getOrgUID}/attendances/attendance`);
            commit('setState', { handle: 'state', key: 'attendance', value: res.data.response });
            commit('setState', { handle: 'state', key: 'loading', value: false });
        } catch($e) {
            commit('setState', { handle: 'state', key: 'loading', value: false });
        }
    },
    async timeInOut({ state, commit }) {
        const app = this._vm;
        console.log("TIME IN/OUT", state);
        try {
            
            const res = await this.$axios.post(`${app.getOrgUID}/attendances`, {
                notes: state.state.notes,
                eod: state.state.eod
            }, { progress: false });
            commit('setState', { handle: 'state', key: 'attendance', value: res.data.response });
        } catch($e) {
            throw $e;
        }
    },
    async eodSubmit({ state, commit }) {
        const app = this._vm;
        try {
            // console.log("TEST", state);
            // const res = await this.$axios.post(`${app.getOrgUID}/attendances`, {
            //     notes: state.state.notes
            // }, { progress: false });
            // commit('setState', { handle: 'state', key: 'attendance', value: res.data.response });
        } catch($e) {
            throw $e;
        }
    },
    async breakLunchInOut({ state, commit }, payload) {
        const app = this._vm;
        try {
            const res = await this.$axios.post(`${app.getOrgUID}/attendances/${state.state.attendance.uid}/breaks`, {
                notes: state.state.breakNotes,
                type: payload
            }, { progress: false });
            commit('setState', { handle: 'state', key: 'attendance', value: res.data.response });
        } catch($e) {
            throw $e;
        }
    }
};

