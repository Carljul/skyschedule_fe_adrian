import defaults from "~/defaults.js";
import Vue from "vue";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            inputs: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            selected: null,
            users: {
                data: [],
                loading: false,
                pagination: {},
                filter: {
                    user_type: defaults.usertypes[0],
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


// getters
export const getters = {
    updateParams(state) {
        if(!state.state.selected) { return null; }
        if(!state.state.selected.canupdatepassword) {
            delete state.state.selected.password;
            delete state.state.selected.password_confirmation;
        }
        return state.state.selected;
    }
};


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
        const itemIndex = state.state.users.data.findIndex(x => x.uid === payload.uid);
        Vue.set(state.state.users.data, itemIndex, payload);
    }
}


// actions
export const actions = {
    async fetchUsers({ state, commit }) {

        if(state.state.users.loading) { return; }

        try {
            commit('setState', { 
                users: { 
                    ...state.state.users, 
                    loading: true 
                } 
            });

            const res = await this.$axios.get('/users', {
                params: state.state.users.filter
            });

            commit('setState', { 
                users: { 
                    ...state.state.users, 
                    data: res.data.data, 
                    pagination: res.data.pagination, 
                    loading: false 
                } 
            });

        } catch($e) {

            commit('setState', { 
                users: { 
                    ...state.state.users, 
                    loading: false 
                } 
            });

        }
    },

    async fetchByUID({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            const res = await this.$axios.get(`/users/${payload}`);
            commit('setState', {
                selected: {
                    ...res.data.response,
                    __title: res.data.response.name
                }
            });
            app.$nextTick(() => {
                app.findPageComponent('AdminUsersEdit').$refs.modal_editentry.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async removeEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`/users/${payload.uid}`);
            dispatch('fetchUsers');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async restoreEntry({dispatch}, payload) {
        const app = this._vm;
        try {
            await this.$axios.patch(`users/${payload.uid}`);
            dispatch('fetchUsers');
        } catch($e) {
            app.errorHandle($e);
        }
    },


    async StoreUpdateEntry({ state, getters, commit }) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`/users/${state.state.selected.uid}`, getters.updateParams);
            commit('updateEntryDataResponse', res.data.response);
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            throw $e;
        }
    },

    async StoreInsertEntry({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            await this.$axios.post(`/users`, state.state.inputs);
            dispatch('fetchUsers');
            commit('resetInputs');
            app.notify({ title: 'Saved!', html: 'New user has been registered.' });
        } catch($e) {
            throw $e;
        }
    }
}