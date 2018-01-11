import Vue from 'vue'
import Vuex from 'vuex'
// import router from './../router/'
// import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    TotalChartData: {},
    TotalTableData: [],
    ActiveChartData: {},
    ActiveTableData: []
  },
  getters: {
    isTotalChartData: (state) => {
      return state.TotalChartData
    },
    isTotalTableData: (state) => {
      return state.TotalTableData
    },
    isActiveChartData: (state) => {
      return state.ActiveChartData
    },
    isActiveTableData: (state) => {
      return state.ActiveTableData
    }
  },
  mutations: {
    m_TotalChartData: (state, payload) => {
      state.TotalChartData = payload
    },
    m_TotalTableData: (state, payload) => {
      state.TotalTableData = payload
    },
    m_ActiveChartData: (state, payload) => {
      state.ActiveChartData = payload
    },
    m_ActiveTableData: (state, payload) => {
      state.ActiveTableData = payload
    }
  },
  actions: {
    a_TotalChartData: (context, val) => {
      context.commit('m_TotalChartData', val)
    },
    a_TotalTableData: (context, val) => {
      context.commit('m_TotalTableData', val)
    },
    a_ActiveChartData: (context, val) => {
      context.commit('m_ActiveChartData', val)
    },
    a_ActiveTableData: (context, val) => {
      context.commit('m_ActiveTableData', val)
    },
    a_getTotalChartData: ({dispatch}) => {
      const dataUserSignedup = require('../DB/user_signedup.json')
      const dataUserDeleted = require('../DB/user_deleted.json')

      let chartDataSet = {
        date: [],
        TotalUserCount: [],
        UserSignedupCount: [],
        UserDeletedCount: []
      }

      let tableDataSet = []

      for (let i = 0; i < dataUserSignedup.length; i++) {
        // chartDataSet setting
        chartDataSet.date.push(dataUserSignedup[i].key_as_string)
        chartDataSet.TotalUserCount.push(dataUserSignedup[i].doc_count - dataUserDeleted[i].doc_count)
        chartDataSet.UserSignedupCount.push(dataUserSignedup[i].doc_count)
        chartDataSet.UserDeletedCount.push(dataUserDeleted[i].doc_count)

        // tableDataSet setting
        tableDataSet.push({
          date: dataUserSignedup[i].key_as_string,
          TotalUserCount: dataUserSignedup[i].doc_count - dataUserDeleted[i].doc_count,
          UserSignedupCount: dataUserSignedup[i].doc_count,
          UserDeletedCount: dataUserDeleted[i].doc_count
        })
      }

      dispatch('a_TotalChartData', chartDataSet)
      dispatch('a_TotalTableData', tableDataSet)
    },
    a_getActiveChartData: ({dispatch}) => {
      let dataDAU = require('../DB/daily-active-users.json').slice(7, this.length)
      // console.log('dd', dataDAU)
      const dataWAU = require('../DB/weekly-active-users.json')
      // console.log(dataWAU)
      const dataMAU = require('../DB/monthly-active-users.json')
      // console.log(dataMAU)

      let chartDataSet = {
        date: [],
        DAU: [],
        WAU: [],
        MAU: []
      }

      let tableDataSet = []

      for (let i = 0; i < dataMAU.length; i++) {
        // chartDataSet setting
        chartDataSet.date.push(dataMAU[i].key)
        chartDataSet.DAU.push(dataDAU[i].doc_count)
        chartDataSet.WAU.push(dataWAU[i].doc_count)
        chartDataSet.MAU.push(dataMAU[i].doc_count)

        // tableDataSet setting
        tableDataSet.push({
          date: dataMAU[i].key,
          DAU: dataDAU[i].doc_count,
          WAU: dataWAU[i].doc_count,
          MAU: dataMAU[i].doc_count
        })
      }

      dispatch('a_ActiveChartData', chartDataSet)
      dispatch('a_ActiveTableData', tableDataSet)
    }
  }

})
