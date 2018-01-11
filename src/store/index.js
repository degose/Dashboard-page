import Vue from 'vue'
import Vuex from 'vuex'
// import router from './../router/'
// import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    ChartData: {},
    TableData: {},

    TotalChartData: {},
    TotalTableData: [],
    ActiveChartData: {},
    ActiveTableData: []
  },
  getters: {
    isChartData: (state) => {
      return state.ChartData
    },
    isTableData: (state) => {
      return state.TableData
    },
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
    m_ChartData: (state, payload) => {
      state.ChartData = payload
    },
    m_TableData: (state, payload) => {
      state.TableData = payload
    },
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
    a_ChartData: (context, val) => {
      context.commit('m_ChartData', val)
    },
    a_TableData: (context, val) => {
      context.commit('m_TableData', val)
    },
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
    a_getTotalData: ({dispatch}) => {
      const dataUserSignedup = require('../DB/user_signedup.json')
      const dataUserDeleted = require('../DB/user_deleted.json')

      let chartDataSet = {
        labels: [],
        datasets: []
      }
      let TotalUserCount = []
      let UserSignedupCount = []
      let UserDeletedCount = []

      let tableDataSet = {
        header: [],
        data: []
      }

      for (let i = 0; i < dataUserSignedup.length; i++) {
        chartDataSet.labels.push(dataUserSignedup[i].key_as_string)
        TotalUserCount.push(dataUserSignedup[i].doc_count - dataUserDeleted[i].doc_count)
        UserSignedupCount.push(dataUserSignedup[i].doc_count)
        UserDeletedCount.push(dataUserDeleted[i].doc_count)

        tableDataSet.data.push({
          date: dataUserSignedup[i].key_as_string,
          TotalUserCount: dataUserSignedup[i].doc_count - dataUserDeleted[i].doc_count,
          UserSignedupCount: dataUserSignedup[i].doc_count,
          UserDeletedCount: dataUserDeleted[i].doc_count
        })
      }

      chartDataSet.datasets.push(
        {
          label: '탈퇴자',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          data: [...UserDeletedCount]
        },
        {
          label: '가입자',
          backgroundColor: 'rgba(255, 206, 86, 0.2',
          borderColor: 'rgba(255, 206, 86,1)',
          borderWidth: 1,
          data: [...UserSignedupCount]
        },
        {
          label: '총 가입자',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235,1)',
          borderWidth: 1,
          data: [...TotalUserCount]
        }
      )

      tableDataSet.header = ['날짜', '가입자', '탈퇴자', '총 가입자']

      dispatch('a_ChartData', chartDataSet)
      dispatch('a_TableData', tableDataSet)
    },
    a_getActiveData: ({dispatch}) => {
      let dataDAU = require('../DB/daily-active-users.json').slice(7, this.length)
      const dataWAU = require('../DB/weekly-active-users.json')
      const dataMAU = require('../DB/monthly-active-users.json')

      let chartDataSet = {
        labels: [],
        datasets: []
      }

      let DAU = []
      let WAU = []
      let MAU = []

      let tableDataSet = {
        header: [],
        data: []
      }

      for (let i = 0; i < dataMAU.length; i++) {
        chartDataSet.labels.push(dataMAU[i].key)
        DAU.push(dataDAU[i].doc_count)
        WAU.push(dataWAU[i].doc_count)
        MAU.push(dataMAU[i].doc_count)

        tableDataSet.data.push({
          date: dataMAU[i].key,
          DAU: dataDAU[i].doc_count,
          WAU: dataWAU[i].doc_count,
          MAU: dataMAU[i].doc_count
        })
      }

      chartDataSet.datasets.push(
        {
          label: 'DAU',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          data: [...DAU]
        },
        {
          label: 'WAU',
          backgroundColor: 'rgba(255, 206, 86, 0.2',
          borderColor: 'rgba(255, 206, 86,1)',
          borderWidth: 1,
          data: [...WAU]
        },
        {
          label: 'MAU',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235,1)',
          borderWidth: 1,
          data: [...MAU]
        }
      )
      tableDataSet.header = ['날짜', 'DAU', 'WAU', 'MAU']

      dispatch('a_ChartData', chartDataSet)
      dispatch('a_TableData', tableDataSet)
    }
  }

})
