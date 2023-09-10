import __get from "lodash.get";
import Vue from "vue";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            loading: false,
            inputs: {
                employee_id_prefix: '',
                employee_id_zero_length: 5,
                employee_id_suffix: '',
                attendance_min_hours: 1,
                attendance_min_in_hours: 1,
                attendance_settings: [],
                break_settings: [],
                break_min_duration: 15,
                break_min_attempt: 0,
                lunch_settings: [],
                lunch_min_duration: 30,
                lunch_min_attempt: 1,
                timein_min_minutes: 15
            },
        }
    }
};


// state
export const state = () => getDefaultState();

// getters
export const getters = {
    getAttendanceSettings(state) {
        return !Array.isArray(state.state.inputs.attendance_settings) ? [] : state.state.inputs.attendance_settings;
    },
    getBreakSettings(state) {
        return !Array.isArray(state.state.inputs.break_settings) ? [] : state.state.inputs.break_settings;
    },
    getLunchSettings(state) {
        return !Array.isArray(state.state.inputs.lunch_settings) ? [] : state.state.inputs.lunch_settings;
    },
}


// mutations
export const mutations = {
    setState(state, payload) {
        Vue.set(__get(state, payload.handle), payload.key, payload.value);
    },
    resetInputs(state) {
        const defaultState = getDefaultState();
        state.state = {...state.state, inputs: defaultState.state.inputs};
    },
    insertAttendanceSetting(state) {
        if(!Array.isArray(state.state.inputs.attendance_settings)) {
            state.state.inputs.attendance_settings = [];
        }
        state.state.inputs.attendance_settings.push({ color: '#222222', hour: 1 });
    },
    removeAttendanceSetting(state, payload) {
        state.state.inputs.attendance_settings.splice(payload, 1);
    },
    insertSettingJsonArray(state, payload) {
        if(!Array.isArray(state.state.inputs[payload])) {
            state.state.inputs[payload] = [];
        }
        state.state.inputs[payload].push({ color: '#222222', hour: 1 });
    },
    removeSettingJsonArray(state, payload) {
        state.state.inputs[payload.key].splice(payload.value, 1);
    }
};


// actions
export const actions = {

    async fetchByUID({commit}) {
        
        const app = this._vm;
        try {
            commit('setState', { handle: 'state', key: 'loading', value: true });
            const res = await this.$axios.get(`/organization/${app.getOrgUID}`, {
                params: {
                    allfields: 1
                }
            });
            commit('setState', { handle: 'state', key: 'inputs', value: {
                ...res.data.response, 
                email: res.data.response.user.email
            } });
            commit('setState', { handle: 'state', key: 'loading', value: false });
            return res.data.response;
        } catch($e) { console.log($e);
            return false;
        }
    },

    async StoreUpdateEntry({ state, commit }) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`/organization/${app.getOrgUID}`, state.state.inputs);
            commit('setState', { handle: 'state', key: 'inputs', value: {
                ...res.data.response, 
                email: res.data.response.user.email
            } });
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            throw $e;
        }
    },

    async updateTimeSettings({ state, commit }) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`/organization/time-settings/${app.getOrgUID}`, state.state.inputs);
            commit('setState', { handle: 'state', key: 'inputs', value: {
                ...res.data.response, 
                email: res.data.response.user.email
            } });
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            throw $e;
        }
    },


    async updateEmployeeIdFormatting({ state, commit }) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`/organization/employee-id/${app.getOrgUID}`, state.state.inputs);
            commit('setState', { handle: 'state', key: 'inputs', value: {
                ...res.data.response, 
                email: res.data.response.user.email
            } });
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            throw $e;
        }
    }
};