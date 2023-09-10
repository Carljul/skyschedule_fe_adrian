import defaults from "~/defaults.js";
import Vue from "vue";
import __get from "lodash.get";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            inputs: {
                firstname: '',
                middlename: '',
                lastname: '',
                address: '',
                phone: '',
                shift_start: null,
                shift_end: null,
                email: '',
                password: '',
                password_confirmation: '',
                date_hired: null,
                position_uid: null,
                documents: [],
                image: null,
                description: null,
                birthday: null,
                salary: null
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
                    department_uid: null,
                    position_uid: null
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
    },
    updateArrayState(state, payload) {
        Vue.set(__get(state.state, payload.key), payload.index, payload.value);
    },
    removeArrayState(state, payload) {
        Vue.delete(__get(state.state, payload.key), payload.index, 1);
    }
}

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

            const res = await this.$axios.get(`${app.getOrgUID}/employees`, {
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

            // const res_new_api = await this.$axios.get(`${app.getOrgUID}/metas/user`, {
            //     params: state.state.entry.filter
            // });
            

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
            const res = await this.$axios.get(`${app.getOrgUID}/employees/${payload}`);
            commit('setState', {
                selected: {
                    ...res.data.response,
                    __title: res.data.response.full_name_completed
                }
            });
            app.$nextTick(() => {
                app.findPageComponent('EmployeesIndexEdit').$refs.modal_editentry.open=true;
            });


            console.log('Data With Leave Credits',state)


            return res.data.response;
        } catch($e) {
            return false;
        }
    },

    async removeEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`${app.getOrgUID}/employees/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async restoreEntry({dispatch}, payload) {
        const app = this._vm;
        try {
            await this.$axios.patch(`${app.getOrgUID}/employees/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async StoreUpdateEntry({ state, getters, commit }) {
        const app = this._vm;
        try {
            const res = await this.$axios.put(`${app.getOrgUID}/employees/${state.state.selected.uid}`, getters.updateParams);
            commit('updateEntryDataResponse', res.data.response);
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            return $e;
        }
    },

    async StoreInsertEntry({ state, dispatch, commit }) {
        const app = this._vm;
        try {
            await this.$axios.post(`${app.getOrgUID}/employees`, state.state.inputs);
            app.notify({ title: 'Saved!', html: 'New employee has been added.' });
            dispatch('fetchEntry');
            commit('resetInputs');
        } catch($e) {
            throw $e;
        }
    },    
}