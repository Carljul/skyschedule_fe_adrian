import defaults from "~/defaults.js";
import Vue from "vue";
import __get from "lodash.get";

/** default state */
const getDefaultState = () => {
    return {
        state: {
            inputs: {
                uid: null,
                permission: null,
                permission_key: null,
                description: null
            },
            entry: {
                loading: false,
                data: [],
                pagination: {},
                filter: {
                    query: '',
                    page: 1,
                    with_trashed: null,
                    only_trashed: null,
                    limit: defaults.limit
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
    resetInputs(state) {
        const defaultState = getDefaultState();
        state.state = {...state.state, inputs: defaultState.state.inputs};
    },
    updateEntryDataResponse(state, payload) {
        const itemIndex = state.state.entry.data.findIndex(x => x.uid === payload.uid);
        Vue.set(state.state.entry.data, itemIndex, payload);
    }
};


// actions
export const actions = {

    async fetchEntry({ state, commit }) {
        if(state.state.entry.loading) { return; }
        try {
            commit('setState', { handle: 'state.entry', key: 'loading', value: true });
            const res = await this.$axios.get(`/permissions`, {
                params: state.state.entry.filter
            });
            commit('setState', { handle: 'state.entry', key: 'data', value: res.data.data });
            commit('setState', { handle: 'state.entry', key: 'pagination', value: res.data.pagination });
            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
        } catch($e) {
            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
        }
    },

    async fetchByUID({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            const res = await this.$axios.get(`/permissions/${payload}`);
            commit('setState', { handle: 'state', key: 'inputs', value: {...res.data.response, __title: res.data.response.permission } });
            app.$nextTick(() => {
                app.findPageComponent('AdministrationPermissionForm').$refs.entryform.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async removeEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`permissions/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async restoreEntry({dispatch}, payload) {
        const app = this._vm;
        try {
            await this.$axios.patch(`permissions/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async StoreUpsertEntry({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            if(state.state.inputs.uid) {
                const insertEntry = await this.$axios.put(`/permissions/${state.state.inputs.uid}`, state.state.inputs);
                commit('updateEntryDataResponse', insertEntry.data.response);
                app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
            } else {
                await this.$axios.post(`/permissions`, state.state.inputs);
                app.notify({ title: 'Saved!', html: 'New metric has been added.' });
                dispatch('fetchEntry');
            }
        } catch($e) {
            throw $e;
        }
    },
};
