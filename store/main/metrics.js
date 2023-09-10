import defaults from "~/defaults.js";
import Vue from "vue";
import __get from "lodash.get";
import moment from 'moment-timezone';

const reminderKey = "__REMINDERS";
const metricsKey = "__METRICS";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            menu: 'calendar',
            editmode: false,
            entry: {
                loading: false,
                data: [],
                filter: {
                    all: 1,
                    limit: defaults.limit,
                    start: null,
                    end: null
                }
            },
            metricsReminderInput: {
                uid: null,
                metrics_value: '',
                metrics_date: null,
                metrics_dateend: null,
                metrics_key: reminderKey,
                color: null
            },
            metricsInput: {
                uid: null,
                metrics_value: '',
                metrics_date: null,
                metrics_dateend: null,
                metrics_key: metricsKey,
                color: null,
                __title: null
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
    resetRemindersInput(state) {
        const defaultState = getDefaultState();
        state.state = {
            ...state.state, 
            metricsReminderInput: {
                ...defaultState.state.metricsReminderInput, 
                metrics_date: state.state.entry.filter.start,
                metrics_dateend: state.state.entry.filter.start,
            }
        };
    },
    resetMetricsInput(state) {
        const defaultState = getDefaultState();
        state.state = {
            ...state.state, 
            metricsInput: defaultState.state.metricsInput
        };
    },
    updateEntryDataResponse(state, payload) {
        const itemIndex = state.state.entry.data.findIndex(x => x.uid === payload.uid);
        Vue.set(state.state.entry.data, itemIndex, payload);
    },
};

// getters
export const getters = {
    getReminder(state) {
        const res = state.state.entry.data.filter(row => row.metrics_key == reminderKey);
        return res.length ? res[0] : null;
    },
    getMetricCalendar(state) {
        //const app = this._vm;
        return state.state.entry.data.filter(row => row.metrics_key == metricsKey)
        .map(row => {
            row.extendedProps = { data: {...row} };
            row.title = row.metrics_value;
            row.start = moment(row.metrics_date).format('YYYY-MM-DD');
            row.end = moment(row.metrics_dateend).format('YYYY-MM-DD');
            row.backgroundColor = row.color;
            row.borderColor = row.color;
            row.textColor = '#ffffff';
            return row;
        });
    },
    getMetricLists(state) {
        return state.state.entry.data.filter(row => row.metrics_key == metricsKey);
    }
}

// actions
export const actions = {
    async fetchEntry({ state, commit }) {
        const app = this._vm;
        if(state.state.entry.loading) { return; }
        try {
            commit('setState', { handle: 'state.entry', key: 'loading', value: true });
            const res = await this.$axios.get(`/${app.getOrgUID}/metrics`, { 
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

    async fetchByUID({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            const res = await this.$axios.get(`${app.getOrgUID}/metrics/${payload}`);
            commit('setState', { handle: 'state', key: 'metricsInput', value: res.data.response });
            app.$nextTick(() => {
                app.findPageComponent('MainMetricsFormModal').$refs.postentrymodal.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async saveReminderMetrics({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            let res = null
            if(state.state.metricsReminderInput.uid) {
                res = await this.$axios.put(`/${app.getOrgUID}/metrics/${state.state.metricsReminderInput.uid}`, state.state.metricsReminderInput);
                commit('updateEntryDataResponse', res.data.response);
            } else {
                res = await this.$axios.post(`/${app.getOrgUID}/metrics`, state.state.metricsReminderInput);
                dispatch('fetchEntry');
            }
            app.notify({ title: 'Saved!', html: 'Reminder has been saved.' });
            commit('setState', { handle: 'state', key: 'editmode', value: false });
            commit('resetRemindersInput');
        } catch($e) {
            throw $e;
        }
    },


    async postSaveMetrics({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            let res = null
            if(state.state.metricsInput.uid) {
                res = await this.$axios.put(`/${app.getOrgUID}/metrics/${state.state.metricsInput.uid}`, state.state.metricsInput);
                commit('updateEntryDataResponse', res.data.response);
                app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
            } else {
                res = await this.$axios.post(`/${app.getOrgUID}/metrics`, state.state.metricsInput);
                app.notify({ title: 'Saved!', html: 'New metric has been added.' });
                dispatch('fetchEntry');
            }
        } catch($e) {
            throw $e;
        }
    },

    async removeEntry({ dispatch, commit }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`${app.getOrgUID}/metrics/${payload.uid}`);
            commit('resetMetricsInput');
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    }
};