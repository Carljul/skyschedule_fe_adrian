import Vue from "vue";
import __get from "lodash.get";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            data: {},
            entry: {
                data: [],
                loading: false,
                filter: {
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
    resetInputs(state) {
        const defaultState = getDefaultState();
        state.state = {...state.state, inputs: defaultState.state.inputs};
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
            const res = await this.$axios.get(`/metas/position`, {
                params: {
                    ...state.state.entry.filter,
                    keys: '__NOTIFICATION_EMAIL,__NOTIFICATION_SLACK,__NOTIFICATION_SYSTEM',
                    organization_uid: app.getOrgUID
                }
            });
            commit('setState', { handle: 'state.entry', key: 'data', value: res.data });
            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
        } catch($e) {
            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
        }
    },

    async entryPostOrUpdate({ state, dispatch }, payload) {
        const app = this._vm; 
        try {
            await this.$axios.post(`/metas/notifications/position`, {
                meta_value: payload.value ? payload.value : null,
                meta_key: payload.key,
                position_uid: state.state.entry.filter.position_uid,
                organization_uid: app.getOrgUID
            });
            await dispatch('fetchEntry');
            app.notify({ title: 'Saved!', html: `Notifications has been saved.` });
        } catch($e) {
            app.errorHandle($e);
        }
    }

}