import defaults from "~/defaults.js";
import Vue from "vue";
import __get from "lodash.get";

// state
export const state = () => ({
  chartData: null,

  state: {
    inputs: {
        name: ''
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
  },
})

// mutations
export const mutations = {
  setState(state, payload) {
      state.state = {
          ...state.state,
          ...payload
      };
  },
  setChartData(state, data) {
    state.chartData = data
  }
}

export const actions = {
  async fetchChartData({ state, commit }, payload) {
    if(state.state.entry.loading) { return; }

    try {
        commit('setState', {
            entry: {
                ...state.state.entry,
                loading: true
            }
        });

        const res = await this.$axios.get(`/charts/orders`, {
            params: state.state.entry.filter
        });

        console.log('DATA',res.data)
        commit('setChartData', res.data)
        commit('setState', {
            entry: {
                ...state.state.entry,
                data: res.data.data,
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
}
