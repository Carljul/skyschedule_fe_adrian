import defaults from "~/defaults.js";
import Vue from "vue";

export const state = () => ({
    status: false,
    authToken: null,
    loggedInUser: null,
 });
  
export const mutations = {
    setLoginStatus(state, result) {
        state.status = result;
    },
    setAuthToken(state, token) {
        state.authToken = token;
    },
    setUser(state, data) {
        state.loggedInUser = data;
    },
    clearAuth(state) {
        state.authToken = null;
        state.loggedInUser = null;
    },
};

export const actions = {
    async login({ state, commit }, payload) {
        try {
            let result = await this.$axios.post('/auth/login', payload)
            await commit('setLoginStatus', result.data.status == 'success');
            await commit('setAuthToken', result.data.response.token);
            await commit('setUser', result.data.response.user);
        } catch (e) {
            await commit('setLoginStatus', false);
            await commit('setAuthToken', null);
            await commit('setUser', null);
        }
    },
    async logout({ state, commit }) {
        try {

            await commit('clearAuth');
        } catch (e) {
            throw e
        }
    },
};
  