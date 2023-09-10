export const state = () => ({
  chartData: null
})

export const mutations = {
  setChartData(state, data) {
    state.chartData = data
  }
}

export const actions = {
  async fetchChartData({ commit, dispatch }, params) {
    let { chart_filter } = params // Optional
    try {
      // Update/Uncomment this and replace it with the actual API
      // const res = await this.$axios.get(`${app.getOrgUID}/chart`)
      // let data = res.data

      // Comment this out, hopefully API will do it like this.
      let data = {
        lineChartOrdersData: {
          labels: ['Jun 15', 'Jun 19', 'Jun 23', 'Jun 27', 'Jul 05', 'Jul 09', 'Jul 13', 'Jul 17', 'Jul 21', 'Jul 25', 'Jul 29', 'Aug', 'Aug 06', 'Aug 10'],
          datasets: [
            {
              label: ['Jun 15', 'Jun 19', 'Jun 23', 'Jun 27', 'Jul 05', 'Jul 09', 'Jul 13', 'Jul 17', 'Jul 21', 'Jul 25', 'Jul 29', 'Aug', 'Aug 06', 'Aug 10'],
              backgroundColor: '#f87979',
              data: [80, 90, 95, 96, 94, 100, 70, 79, 77, 65, 66, 69, 85, 90, 81, 59, 70, 90, 60, 70, 21, 20, 8, 10, 1, 3, 1, 2, 3, 2]
            }
          ]
        },
        lineChartLineItemsData: {
          labels: ['Digital Cups', 'Digital Napkins', 'Digital Other', 'HotStamp', 'Offset Cups', 'Pad', 'Screen Cups', 'Screen Napkins'],
          datasets: [
            {
              label: ['Digital Cups', 'Digital Napkins', 'Digital Other', 'HotStamp', 'Offset Cups', 'Pad', 'Screen Cups', 'Screen Napkins'],
              backgroundColor: ['pink', 'purple', 'violet', 'red', 'yellow', 'green', 'blue', 'grey'],
              data: [50000, 110000, 75000, 25000, 575000, 100000, 501000, 30000],
            }
          ]
        },
        barChartData: {
          labels: ['Digital Cups', 'Digital Napkins', 'Digital Other', 'HotStamp', 'Offset Cups', 'Pad', 'Screen Cups', 'Screen Napkins'],
          datasets: [{
            label: ['Digital Cups', 'Digital Napkins', 'Digital Other', 'HotStamp', 'Offset Cups', 'Pad', 'Screen Cups', 'Screen Napkins'],
            data: [50000, 110000, 75000, 25000, 575000, 100000, 501000, 30000],
            backgroundColor: ['pink', 'purple', 'violet', 'red', 'yellow', 'green', 'blue', 'grey'],
          }]
        },
        pieChartData: {
          labels: ['pad', 'digital napkins', 'digital_cups', 'screen napkins', 'digital_other', 'screen_cups'],
          datasets: [{
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', 'blue', 'yellow'],
            data: [9.09, 9.09, 9.09, 9.09, 9.09, 54.55]
          }]
        },
        barChartDataFilter: [{
          id: 1,
          name: 'Held'
        },{
          id: 2,
          name: 'Proofing'
        },{
          id: 3,
          name: 'WOA'
        },{
          id: 4,
          name: 'Outputting'
        },{
          id: 5,
          name: 'Screening'
        },{
          id: 6,
          name: 'Printing'
        },{
          id: 7,
          name: 'Packaging'
        }]
      }

      await commit('setChartData', data)
    } catch ($e) {
      throw $e
    }
  }
}