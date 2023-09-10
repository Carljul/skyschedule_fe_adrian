import Vue from "vue";
import __get from "lodash.get";

/** VUEX */

// state
export const state = () => ({
    page: 'Home',
    state: {
        isSidebarOpen: true,
        isSearchBoxOpen: false,
        organizationUID: null,
        organization: {},
        appload: false,
        preference: {
            is24hour: false
        }
    }
});


// mutations
export const mutations = {
    setState(state, payload) {
        state.state = {
            ...state.state,
            ...payload
        }
    },
    setStateV2(state,payload) {
        Vue.set(__get(state, payload.handle), payload.key, payload.value);
    },
    setPage(state, page) {
        state.page = page
    }
}


// actions
export const actions = {
    async assignPage({state, commit}, page) {
        await commit('setPage', page)
    },
    async refreshUserSession() {
        const app = this._vm;
        try {
            const res = await this.$axios.get(`/auth/user`);
            this.$auth.setUser(res.data.response);
        } catch($e) {
            app.notify($e);
        }
    }
}