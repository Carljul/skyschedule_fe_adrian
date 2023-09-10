import defaults from "~/defaults.js";
import Vue from "vue";
import __get from "lodash.get";


// state
export const state = () => ({
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
    }
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

            commit('setTotals', res.data);
        } catch($e) {
            commit('setTotals', []);
        }
    }
};