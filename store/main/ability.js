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
        }
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
        const itemIndex = state.state.entry.data.findIndex(x => x.uid === payload.uid);
        Vue.set(state.state.entry.data, itemIndex, payload);
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

            const res = await this.$axios.get(`/abilities`, {
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
            const res = await this.$axios.get(`${app.getOrgUID}/abilities/${payload}`);
            commit('setState', { handle: 'state', key: 'inputs', value: res.data.response });
            app.$nextTick(() => {
                app.findPageComponent('MainRoleForm').$refs.adjustmentmodal.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async saveEntry({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            let res = null
            if(state.state.inputs.uid) {
                res = await this.$axios.put(`/${app.getOrgUID}/abilities/${state.state.inputs.uid}`, state.state.inputs);
                commit('updateEntryDataResponse', res.data.response);
                app.notify({ title: 'Saved!', html: 'Overtime has been saved.' });
            } else {
                res = await this.$axios.post(`/${app.getOrgUID}/abilities`, state.state.inputs);
                app.notify({ title: 'Saved!', html: 'Overtime has been added.' });
                dispatch('fetchEntry');
            }
        } catch($e) {
            throw $e;
        }
    },

    async removeEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`${app.getOrgUID}/abilities/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    }
};