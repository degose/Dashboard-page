import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    ChartData: {},
    TableData: {},
    ActiveTableData: [],

    DAU: [],
    allDAU: [],
    changeDAU: [],
    WAU: [],
    MAU: []
  },
  getters: {
    isChartData: (state) => {
      return state.ChartData
    },
    isTableData: (state) => {
      return state.TableData
    },
    isActiveTableData: (state) => {
      return state.ActiveTableData
    },

    isDAU: (state) => {
      return state.DAU
    },
    isAllDAU: (state) => {
      return state.allDAU
    },
    isChangeDAU: (state) => {
      return state.changeDAU
    },
    isWAU: (state) => {
      return state.WAU
    },
    isMAU: (state) => {
      return state.MAU
    }
  },
  mutations: {
    m_ChartData: (state, payload) => {
      state.ChartData = payload
    },
    m_TableData: (state, payload) => {
      state.TableData = payload
    },
    m_ActiveTableData: (state, payload) => {
      state.ActiveTableData = payload
    },

    m_DAU: (state, payload) => {
      state.DAU = payload
    },
    m_AllDAU: (state, payload) => {
      state.allDAU = payload
    },
    m_changeDAU: (state, payload) => {
      state.changeDAU = payload
    },
    m_WAU: (state, payload) => {
      state.WAU = payload
    },
    m_MAU: (state, payload) => {
      state.MAU = payload
    }
  },
  actions: {
    a_ChartData: (context, val) => {
      context.commit('m_ChartData', val)
    },
    a_TableData: (context, val) => {
      context.commit('m_TableData', val)
    },
    a_ActiveTableData: (context, val) => {
      context.commit('m_ActiveTableData', val)
    },

    a_DAU: (context, val) => {
      context.commit('m_DAU', val)
    },
    a_AllDAU: (context, val) => {
      context.commit('m_AllDAU', val)
    },
    a_changeDAU: (context, val) => {
      context.commit('m_changeDAU', val)
    },
    a_WAU: (context, val) => {
      context.commit('m_WAU', val)
    },
    a_MAU: (context, val) => {
      context.commit('m_MAU', val)
    },

    a_makeTotalChartTable: ({dispatch}, val) => {
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

      for (let i = 0; i < val.dataUserSignedup.length; i++) {
        chartDataSet.labels.push(val.dataUserSignedup[i].key_as_string)
        TotalUserCount.push(val.dataUserSignedup[i].doc_count - val.dataUserDeleted[i].doc_count)
        UserSignedupCount.push(val.dataUserSignedup[i].doc_count)
        UserDeletedCount.push(val.dataUserDeleted[i].doc_count)

        tableDataSet.data.push({
          date: val.dataUserSignedup[i].key_as_string,
          UserSignedupCount: val.dataUserSignedup[i].doc_count,
          UserDeletedCount: val.dataUserDeleted[i].doc_count,
          TotalUserCount: val.dataUserSignedup[i].doc_count - val.dataUserDeleted[i].doc_count
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
    a_makeActiveChartTable: ({state, dispatch}, val) => {
      // console.log('a_makeActiveChartTable', val)
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

      let activeTableDataSet = []
      let sumDAU = 0
      let sumWAU = 0
      let sumMAU = 0

      for (let i = 0; i < val.dataMAU.length; i++) {
        chartDataSet.labels.push(val.dataMAU[i].key)
        DAU.push(val.dataDAU[i].doc_count)
        WAU.push(val.dataWAU[i].doc_count)
        MAU.push(val.dataMAU[i].doc_count)

        tableDataSet.data.push({
          date: val.dataMAU[i].key,
          changeDAU: val.changeDAU[i],
          DAU: val.dataDAU[i].doc_count,
          WAU: val.dataWAU[i].doc_count,
          MAU: val.dataMAU[i].doc_count
        })

        sumDAU += DAU[i]
        sumWAU += WAU[i]
        sumMAU += MAU[i]
      }

      chartDataSet.datasets.push(
        {
          label: 'DAU 전주대비 변화',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: [...val.changeDAU]
        },
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

      tableDataSet.header = ['날짜', 'DAU 전주대비 변화', 'DAU', 'WAU', 'MAU']

      activeTableDataSet.push(
        {
          name: 'DAU',
          min: Math.min(...DAU),
          max: Math.max(...DAU),
          avg: Math.floor(sumDAU / DAU.length)
        },
        {
          name: 'WAU',
          min: Math.min(...WAU),
          max: Math.max(...WAU),
          avg: Math.floor(sumWAU / WAU.length)
        },
        {
          name: 'MAU',
          min: Math.min(...MAU),
          max: Math.max(...MAU),
          avg: Math.floor(sumMAU / MAU.length)
        }
      )

      dispatch('a_ChartData', chartDataSet)
      dispatch('a_TableData', tableDataSet)
      dispatch('a_ActiveTableData', activeTableDataSet)
    },

    a_getTotalData: ({dispatch}) => {
      let dataUserSignedup = require('../DB/user_signedup.json')
      let dataUserDeleted = require('../DB/user_deleted.json')

      dispatch('a_makeTotalChartTable', {
        dataUserSignedup: dataUserSignedup,
        dataUserDeleted: dataUserDeleted
      })
    },
    a_getActiveData: ({dispatch, commit}) => {
      let dataDAU = require('../DB/daily-active-users.json').slice(7, this.length)
      let allDataDAU = require('../DB/daily-active-users.json')
      let dataWAU = require('../DB/weekly-active-users.json')
      let dataMAU = require('../DB/monthly-active-users.json')
      let changeDAU = []

      for (let i = 0; i < allDataDAU.length; i++) {
        if (allDataDAU[i - 7] !== null && allDataDAU[i - 7] !== undefined) {
          changeDAU.push(allDataDAU[i].doc_count - allDataDAU[i - 7].doc_count)
        }
      }

      dispatch('a_makeActiveChartTable', {
        dataDAU: dataDAU,
        changeDAU: changeDAU,
        dataWAU: dataWAU,
        dataMAU: dataMAU
      })

      dispatch('a_DAU', dataDAU)
      dispatch('a_AllDAU', allDataDAU)
      dispatch('a_changeDAU', changeDAU)
      dispatch('a_WAU', dataWAU)
      dispatch('a_MAU', dataMAU)
    },

    // filter Action
    a_changeData: ({state, dispatch}, val) => {
      console.log('연결', val)
      // let dataDAUparent = require('../DB/dau_parent.json')
      // let dataDAUstudent = require('../DB/dau_student.json')
      // let dataDAUteacher = require('../DB/dau_teacher.json')

      if (val.select_user === '' && val.select_country === '') {
        dispatch('a_DateChange', {
          input_start_date: val.input_start_date,
          input_end_date: val.input_end_date
        })
      } else if (val.select_user !== '') {
        dispatch('a_UserChange', {
          input_start_date: val.input_start_date,
          input_end_date: val.input_end_date,
          select_user: val.select_user
        })
      }
    },

    a_DateChange: ({state, dispatch}, val) => {
      // console.log('a_DateChange', val)
      let sliceDAU = []
      let sliceChangeDAU = []
      let sliceWAU = []
      let sliceMAU = []
      let startIndex = ''
      let endIndex = ''

      for (let i = 0; i < state.DAU.length; i++) {
        if (state.DAU[i].key === val.input_start_date.split('-').join('')) {
          startIndex = i
        }
        if (state.DAU[i].key === val.input_end_date.split('-').join('')) {
          endIndex = i + 1
        }
      }
      if (endIndex === '') {
        sliceDAU.push(...state.DAU.slice(startIndex))
        sliceChangeDAU.push(...state.changeDAU.slice(startIndex))
        sliceWAU.push(...state.WAU.slice(startIndex))
        sliceMAU.push(...state.MAU.slice(startIndex))
      } else if (startIndex === '') {
        sliceDAU.push(...state.DAU.slice(0, endIndex))
        sliceChangeDAU.push(...state.changeDAU.slice(0, endIndex))
        sliceWAU.push(...state.WAU.slice(0, endIndex))
        sliceMAU.push(...state.MAU.slice(0, endIndex))
      } else {
        sliceDAU.push(...state.DAU.slice(startIndex, endIndex))
        sliceChangeDAU.push(...state.changeDAU.slice(startIndex, endIndex))
        sliceWAU.push(...state.WAU.slice(startIndex, endIndex))
        sliceMAU.push(...state.MAU.slice(startIndex, endIndex))
      }

      dispatch('a_makeActiveChartTable', {
        dataDAU: sliceDAU,
        changeDAU: sliceChangeDAU,
        dataWAU: sliceWAU,
        dataMAU: sliceMAU
      })
    },
    a_UserChange: ({dispatch}, val) => {
      let dataDAUparent = require('../DB/dau_parent.json')
      let dataDAUstudent = require('../DB/dau_student.json')
      let dataDAUteacher = require('../DB/dau_teacher.json')
      let dataWAUparent = require('../DB/wau_parent.json')
      let dataWAUstudent = require('../DB/wau_student.json')
      let dataWAUteacher = require('../DB/wau_teacher.json')
      let dataMAUparent = require('../DB/mau_parent.json')
      let dataMAUstudent = require('../DB/mau_student.json')
      let dataMAUteacher = require('../DB/mau_teacher.json')

      let changeDAU = []

      for (let i = 0; i < dataDAUparent.length; i++) {
        if (dataDAUparent[i - 7] !== null && dataDAUparent[i - 7] !== undefined) {
          changeDAU.push(dataDAUparent[i].doc_count - dataDAUparent[i - 7].doc_count)
        }
      }

      if (val.select_user === 'Parent') {
        dispatch('a_makeActiveChartTable', {
          dataDAU: dataDAUparent.slice(7, this.length),
          changeDAU: changeDAU,
          dataWAU: dataWAUparent,
          dataMAU: dataMAUparent
        })
      } else if (val.select_user === 'Student') {
        dispatch('a_makeActiveChartTable', {
          dataDAU: dataDAUstudent.slice(7, this.length),
          changeDAU: changeDAU,
          dataWAU: dataWAUstudent,
          dataMAU: dataMAUstudent
        })
      } else {
        dispatch('a_makeActiveChartTable', {
          dataDAU: dataDAUteacher.slice(7, this.length),
          changeDAU: changeDAU,
          dataWAU: dataWAUteacher,
          dataMAU: dataMAUteacher
        })
      }
    },
    a_CountryChange: ({dispatch}, val) => {
      // const data = ''
    }
  }

})
