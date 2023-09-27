import defaults from "~/defaults.js";
import Vue from "vue";
import __get from "lodash.get";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            inputs: {
                name: '',
                username: '',
                email: '',
                password: '',
                password_confirmation: '',                
                image: null,
                avatar: null,
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
        console.log(['payload', payload])
        console.log(['state.state.entry.data', state.state.entry.data])
        const itemIndex = state.state.entry.data.findIndex(x => x.id === payload.id);
        console.log(['itemIndex', itemIndex])
        Vue.set(state.state.entry.data, itemIndex, payload);
        console.log(['checking', state.state.entry.data[itemIndex]])
    },
    removeArrayState(state, payload) {
        Vue.delete(__get(state.state, payload.key), payload.index, 1);
    }
}
// getters
export const getters = {
    updateParams(state) {
        if(!state.state.selected) { return null; }
        // if(!state.state.selected.canupdatepassword) {
        //     delete state.state.selected.user.password;
        //     delete state.state.selected.user.password_confirmation;
        // }
        // delete state.state.selected.user.uid;
        return {...state.state.selected, ...state.state.selected.user};
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

            const res = await this.$axios.get(`/users`, {
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

    async fetchByID({commit}, payload) {
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
                app.findPageComponent('UsersIndexEdit').$refs.modal_editentry.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async removeEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`/users/${payload.id}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async restoreEntry({dispatch}, payload) {
        const app = this._vm;
        try {
            await this.$axios.patch(`/employees/${payload.id}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async StoreUpdateEntry({ state, getters, commit }) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`/users/${state.state.selected.id}`, getters.updateParams);
            commit('updateEntryDataResponse', res.data.response);
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            return $e;
        }
    },

    async StoreInsertEntry({ state, dispatch, commit }) {
        const app = this._vm;
        try {
            await this.$axios.post(`/users`, state.state.inputs);
            app.notify({ title: 'Saved!', html: 'New employee has been added.' });
            dispatch('fetchEntry');
            commit('resetInputs');
        } catch($e) {
            throw $e;
        }
    }, 
};