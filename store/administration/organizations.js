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
                password_confirmation: '',
                organization: '',
                timezone: '',
                logo: null,
                address: '',
                employee_id_prefix: null,
                employee_id_zero_length: 0,
                employee_id_suffix: null,
                webhook_google_hangouts_chat: null,
                probationary_months: 6,
                currency: 'USD'
            },
            selected: {},
            entry: {
                data: [],
                loading: false,
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


// getters
export const getters = {
    updateParams(state) {
        if(!state.state.selected) { return null; }
        if(!state.state.selected.canupdatepassword) {
            delete state.state.selected.user.password;
            delete state.state.selected.user.password_confirmation;
        }
        delete state.state.selected.user.uid;
        return {...state.state.selected, ...state.state.selected.user};
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

            const res = await this.$axios.get(`/organization`, {
                params: state.state.entry.filter
            });

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
            const res = await this.$axios.get(`/organization/${payload}`, {
                params: {
                    allfields: 1
                }
            });
            commit('setState', {
                selected: {
                    ...res.data.response,
                    __title: res.data.response.organization
                }
            });
            app.$nextTick(() => {
                app.findPageComponent('AdminOrganizationsEdit').$refs.modal_editentry.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async removeEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`organization/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async restoreEntry({dispatch}, payload) {
        const app = this._vm;
        try {
            await this.$axios.patch(`organization/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },


    async StoreUpdateEntry({ state, getters, commit }) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`/organization/${state.state.selected.uid}`, getters.updateParams);
            commit('updateEntryDataResponse', res.data.response);
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            throw $e;
        }
    },

    async StoreInsertEntry({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            await this.$axios.post(`/organization`, state.state.inputs);
            dispatch('fetchEntry');
            commit('resetInputs');
            app.notify({ title: 'Saved!', html: 'New organization has been registered.' });
        } catch($e) {
            throw $e;
        }
    },

    async organizationSignInOutAdmin({ dispatch }, payload) {
        const app = this._vm;
        if(!app.appIsAdmin) { return; }
        try {
            await this.$axios.post(`/metas/user`, {
                meta_key: defaults.orgSessionKey,
                user_uid: app.$nuxt.$auth.user.uid,
                meta_value: payload
            });
            await dispatch('global/refreshUserSession', {}, { root: true });
        } catch($e) {
            app.notify($e);
        }
    }

}