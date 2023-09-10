import defaults from "~/defaults.js";
import Vue from "vue";
import __get from "lodash.get";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            inputs: {
                uuid: null,
                permission_uid: null,
                permission_value: 1
            },
            position: {},
            entry: {
                data: [],
                loading: false,
                pagination: {},
                filter: {
                    query: '',
                    page: 1,
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
    resetInputs(state) {
        const defaultState = getDefaultState();
        state.state = {...state.state, inputs: defaultState.state.inputs};
    },
    updateEntryDataResponse(state, payload) {
        const itemIndex = state.state.entry.data.findIndex(x => x.uid === payload.uid);
        Vue.set(state.state.entry.data, itemIndex, payload);
    },
    setState(state, payload) {
        Vue.set(__get(state, payload.handle), payload.key, payload.value);
    }
}


// actions
export const actions = {
    async fetchEntry({ state, commit }) {
        const app = this._vm;
        try {
            commit('setState', { handle: 'state.entry', key: 'loading', value: true });
            const res = await this.$axios.get(`${app.getOrgUID}/permission-access/positions`, {
                params: {
                    ...state.state.entry.filter,
                    position_uid: state.state.position.uid
                }
            });
            commit('setState', { handle: 'state.entry', key: 'data', value: res.data.data });
            commit('setState', { handle: 'state.entry', key: 'pagination', value: res.data.pagination });
            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
        } catch($e) {
            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
        }
    },

    async removeEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`${app.getOrgUID}/permission-access/positions/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async StoreEntry({ state, dispatch }) {
        const app = this._vm; 
        try {
            await this.$axios.post(`${app.getOrgUID}/permission-access/positions`, {
                ...state.state.inputs,
                position_uid: state.state.position.uid
            });
            app.notify({ title: 'Saved!', html: 'New permission has been added.' });
            dispatch('fetchEntry');
        } catch($e) {
            throw $e;
        }
    },

    async permissionUpdate({ commit }, payload) {
        const app = this._vm; 
        try {
            const res = await this.$axios.patch(`${app.getOrgUID}/permission-access/positions/${payload.uid}`, {
                permission_value: payload.value
            });
            commit('updateEntryDataResponse', res.data.response);
            app.notify({ title: 'Saved!', html: `<strong>${payload.permission.permission}</strong> Permission has been ${payload.value == 1 ? 'enabled' : 'disabled'}.` });
        } catch($e) {
            app.errorHandle($e);
        }
    }

}