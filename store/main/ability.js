import defaults from "~/defaults.js";
import Vue from "vue";
import __get from "lodash.get";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            inputs: {
                name: '',
                title: ''
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
        const itemIndex = state.state.entry.data.findIndex(x => x.id === payload.id);
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

    async fetchByID({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            const res = await this.$axios.get(`/abilities/${payload}`);
            commit('setState', {
                selected: {
                    ...res.data.response,
                    __title: res.data.response.title
                }
            });
            app.$nextTick(() => {
                app.findPageComponent('AbilityIndexEdit').$refs.modal_editentry.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async removeEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`/abilities/${payload.id}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async restoreEntry({dispatch}, payload) {
        const app = this._vm;
        try {
            await this.$axios.patch(`/abilities/${payload.id}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async StoreUpdateEntry({ state, commit }) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`/abilities/${state.state.selected.id}`, state.state.selected);
            commit('updateEntryDataResponse', res.data.response)
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            throw $e;
        }
    },
    
    async StoreInsertEntry({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            await this.$axios.post(`/abilities`, state.state.inputs);
            dispatch('fetchEntry');
            commit('resetInputs');
            app.notify({ title: 'Saved!', html: 'New Ability has been saved.' });
        } catch($e) {
            throw $e;
        }
    }
};