import defaults from "~/defaults.js";
import Vue from "vue";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            inputs: {                
                user_uid: '',
                project_name: '',
                task_priority: '',
                task_status: '',
                task_progress: '',
                task_description: '',
                start_time: '',
                end_time: ''
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

            const res = await this.$axios.get(`${app.getOrgUID}/eods/myEod`, {
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
            console.log('STATEs',state)

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
            const res = await this.$axios.get(`${app.getOrgUID}/eods/${payload}`);
            commit('setState', {
                selected: {
                    ...res.data.response,
                    __title: res.data.response.title
                }
            });
            app.$nextTick(() => {
                app.findPageComponent('EmployeesEodEdit').$refs.modal_editentry.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async removeEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`${app.getOrgUID}/eods/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async restoreEntry({dispatch}, payload) {
        const app = this._vm;
        try {
            await this.$axios.patch(`${app.getOrgUID}/eods/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async StoreUpdateEntry({ state, commit }) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`${app.getOrgUID}/eods/${state.state.selected.uid}`, state.state.selected);
            commit('updateEntryDataResponse', res.data.response)
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            throw $e;
            
        }
    },
    
    async StoreInsertEntry({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            await this.$axios.post(`${app.getOrgUID}/eods`, state.state.inputs);
            dispatch('fetchEntry');
            commit('resetInputs');
            app.notify({ title: 'Saved!', html: 'New Request has been saved.' });
        } catch($e) {
            throw $e;
        }
    }
}