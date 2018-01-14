import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    ChartData: {},
    TableData: {},
    ActiveTableData: [],
    NotiMessage: '',

    DAU: [],
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
    isNotiMessage: (state) => {
      return state.NotiMessage
    },
    isDAU: (state) => {
      return state.DAU
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
    m_NotiMessage: (state, payload) => {
      state.NotiMessage = payload
    },
    m_DAU: (state, payload) => {
      state.DAU = payload
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
    // state 값 변경을 위한 action
    a_ChartData: ({commit}, val) => {
      commit('m_ChartData', val)
    },
    a_TableData: ({commit}, val) => {
      commit('m_TableData', val)
    },
    a_ActiveTableData: ({commit}, val) => {
      commit('m_ActiveTableData', val)
    },
    a_NotiMessage: ({commit}, val) => {
      commit('m_NotiMessage', val)
    },
    a_DAU: ({commit}, val) => {
      commit('m_DAU', val)
    },
    a_changeDAU: ({commit}, val) => {
      commit('m_changeDAU', val)
    },
    a_WAU: ({commit}, val) => {
      commit('m_WAU', val)
    },
    a_MAU: ({commit}, val) => {
      commit('m_MAU', val)
    },

    // 초기 data 가져오는 action
    a_getTotalData: ({dispatch}) => {
      const dataUserSignedup = require('../DB/user_signedup.json')
      const dataUserDeleted = require('../DB/user_deleted.json')

      dispatch('a_makeTotalChartTable', {
        dataUserSignedup: dataUserSignedup,
        dataUserDeleted: dataUserDeleted
      })
    },
    a_getActiveData: ({dispatch, commit}) => {
      const dataDAU = require('../DB/daily-active-users.json').slice(7, this.length)
      const allDataDAU = require('../DB/daily-active-users.json')
      const dataWAU = require('../DB/weekly-active-users.json')
      const dataMAU = require('../DB/monthly-active-users.json')
      let changeDAU = []

      for (let i = 0; i < allDataDAU.length; i++) {
        if (allDataDAU[i - 7]) {
          changeDAU.push(allDataDAU[i].doc_count - allDataDAU[i - 7].doc_count)
        }
      }

      dispatch('a_makeActiveChartTable', {
        title: '',
        dataDAU: dataDAU,
        changeDAU: changeDAU,
        dataWAU: dataWAU,
        dataMAU: dataMAU
      })

      dispatch('a_DAU', dataDAU)
      dispatch('a_changeDAU', changeDAU)
      dispatch('a_WAU', dataWAU)
      dispatch('a_MAU', dataMAU)
    },

    // chart & table data 형식으로 만드는 action
    a_makeTotalChartTable: ({dispatch}, val) => {
      let chartDataSet = {
        title: '총 가입자 지표',
        labels: [],
        datasets: []
      }
      let TotalUserCount = []
      let UserSignedupCount = []
      let UserDeletedCount = []

      let tableDataSet = {
        header: ['날짜', '가입자', '탈퇴자', '총 가입자'],
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
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
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

      dispatch('a_ChartData', chartDataSet)
      dispatch('a_TableData', tableDataSet)
    },
    a_makeActiveChartTable: ({dispatch}, val) => {
      // console.log('a_makeActiveChartTable', val)
      let chartDataSet = {
        title: `${val.title}MAU, WAU, MAU 지표`,
        labels: [],
        datasets: []
      }

      let DAU = []
      let WAU = []
      let MAU = []

      let tableDataSet = {
        header: ['날짜', 'DAU 전주대비 변화', 'DAU', 'WAU', 'MAU'],
        data: []
      }

      let activeTableDataSet = {
        header: ['기준', '최대', '최소', '평균'],
        data: []
      }

      let sumDAU = 0
      let sumWAU = 0
      let sumMAU = 0

      for (let i = 0; i < val.dataMAU.length; i++) {
        chartDataSet.labels.push(val.dataMAU[i].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'))
        DAU.push(val.dataDAU[i].doc_count)
        WAU.push(val.dataWAU[i].doc_count)
        MAU.push(val.dataMAU[i].doc_count)

        tableDataSet.data.push({
          date: val.dataMAU[i].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
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
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
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

      let DAUminDate = ''
      let DAUmaxDate = ''
      let WAUminDate = ''
      let WAUmaxDate = ''
      let MAUminDate = ''
      let MAUmaxDate = ''
      for (let i = 0; i < DAU.length; i++) {
        if (val.dataDAU[i].doc_count === Math.min(...DAU)) {
          DAUminDate = val.dataDAU[i].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
        }
        if (val.dataDAU[i].doc_count === Math.max(...DAU)) {
          DAUmaxDate = val.dataDAU[i].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
        }
        if (val.dataWAU[i].doc_count === Math.min(...WAU)) {
          WAUminDate = val.dataWAU[i].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
        }
        if (val.dataWAU[i].doc_count === Math.max(...WAU)) {
          WAUmaxDate = val.dataWAU[i].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
        }
        if (val.dataMAU[i].doc_count === Math.min(...MAU)) {
          MAUminDate = val.dataMAU[i].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
        }
        if (val.dataMAU[i].doc_count === Math.max(...MAU)) {
          MAUmaxDate = val.dataMAU[i].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
        }
      }

      activeTableDataSet.data.push(
        {
          name: 'DAU',
          min: Math.min(...DAU) + ` (${DAUminDate})`,
          max: Math.max(...DAU) + ` (${DAUmaxDate})`,
          avg: Math.floor(sumDAU / DAU.length)
        },
        {
          name: 'WAU',
          min: Math.min(...WAU) + ` (${WAUminDate})`,
          max: Math.max(...WAU) + ` (${WAUmaxDate})`,
          avg: Math.floor(sumWAU / WAU.length)
        },
        {
          name: 'MAU',
          min: Math.min(...MAU) + ` (${MAUminDate})`,
          max: Math.max(...MAU) + ` (${MAUmaxDate})`,
          avg: Math.floor(sumMAU / MAU.length)
        }
      )

      dispatch('a_ChartData', chartDataSet)
      dispatch('a_TableData', tableDataSet)
      dispatch('a_ActiveTableData', activeTableDataSet)
    },

    // filter Action
    a_changeData: ({state, dispatch}, val) => {
      if (val.select_user === '' && val.select_country === '') {
        dispatch('a_DateChange', {
          title: '',
          input_start_date: val.input_start_date,
          input_end_date: val.input_end_date,
          dataDAU: state.DAU,
          changeDAU: state.changeDAU,
          dataWAU: state.WAU,
          dataMAU: state.MAU
        })
      } else if (val.select_user !== '') {
        dispatch('a_UserChange', val)
      } else if (val.select_country !== '') {
        dispatch('a_CountryChange', val)
      }
    },

    // 시작 날짜와 종료 날짜에 해당하는 data를 잘라주는 action
    a_DateChange: ({dispatch}, val) => {
      let sliceData = {
        title: val.title,
        dataDAU: [],
        changeDAU: [],
        dataWAU: [],
        dataMAU: []
      }
      let startIndex = ''
      let endIndex = ''

      for (let i = 0; i < val.dataDAU.length; i++) {
        if (val.dataDAU[i].key === val.input_start_date.split('-').join('')) {
          startIndex = i
        }
        if (val.dataDAU[i].key === val.input_end_date.split('-').join('')) {
          endIndex = i + 1
        }
      }
      if (endIndex === '') {
        sliceData.dataDAU.push(...val.dataDAU.slice(startIndex))
        sliceData.changeDAU.push(...val.changeDAU.slice(startIndex))
        sliceData.dataWAU.push(...val.dataWAU.slice(startIndex))
        sliceData.dataMAU.push(...val.dataMAU.slice(startIndex))
      } else if (startIndex === '') {
        sliceData.dataDAU.push(...val.dataDAU.slice(0, endIndex))
        sliceData.changeDAU.push(...val.changeDAU.slice(0, endIndex))
        sliceData.dataWAU.push(...val.dataWAU.slice(0, endIndex))
        sliceData.dataMAU.push(...val.dataMAU.slice(0, endIndex))
      } else {
        sliceData.dataDAU.push(...val.dataDAU.slice(startIndex, endIndex))
        sliceData.changeDAU.push(...val.changeDAU.slice(startIndex, endIndex))
        sliceData.dataWAU.push(...val.dataWAU.slice(startIndex, endIndex))
        sliceData.dataMAU.push(...val.dataMAU.slice(startIndex, endIndex))
      }

      dispatch('a_makeActiveChartTable', sliceData)
    },
    // user, country data 가져오는 action
    a_UserChange: ({dispatch}, val) => {
      let userData = {
        title: '',
        input_start_date: val.input_start_date,
        input_end_date: val.input_end_date,
        dataDAU: [],
        changeDAU: [],
        dataWAU: [],
        dataMAU: []
      }

      if (val.select_user === 'Parent') {
        const dataDAUparent = require('../DB/dau_parent.json')
        userData.dataDAU = dataDAUparent.slice(7, this.length)
        userData.dataWAU = require('../DB/wau_parent.json')
        userData.dataMAU = require('../DB/mau_parent.json')
        userData.title = 'Parent '
        for (let i = 0; i < dataDAUparent.length; i++) {
          if (dataDAUparent[i - 7]) {
            userData.changeDAU.push(dataDAUparent[i].doc_count - dataDAUparent[i - 7].doc_count)
          }
        }
        if (val.input_start_date === '' && val.input_end_date === '') {
          dispatch('a_makeActiveChartTable', userData)
        } else {
          dispatch('a_DateChange', userData)
        }
      } else if (val.select_user === 'Student') {
        const dataDAUstudent = require('../DB/dau_student.json')
        userData.dataDAU = dataDAUstudent.slice(7, this.length)
        userData.dataWAU = require('../DB/wau_student.json')
        userData.dataMAU = require('../DB/mau_student.json')
        userData.title = 'Student '
        for (let i = 0; i < dataDAUstudent.length; i++) {
          if (dataDAUstudent[i - 7]) {
            userData.changeDAU.push(dataDAUstudent[i].doc_count - dataDAUstudent[i - 7].doc_count)
          }
        }
        if (val.input_start_date === '' && val.input_end_date === '') {
          dispatch('a_makeActiveChartTable', userData)
        } else {
          dispatch('a_DateChange', userData)
        }
      } else {
        const dataDAUteacher = require('../DB/dau_teacher.json')
        userData.dataDAU = dataDAUteacher.slice(7, this.length)
        userData.dataWAU = require('../DB/wau_teacher.json')
        userData.dataMAU = require('../DB/mau_teacher.json')
        userData.title = 'Teacher '
        for (let i = 0; i < dataDAUteacher.length; i++) {
          if (dataDAUteacher[i - 7]) {
            userData.changeDAU.push(dataDAUteacher[i].doc_count - dataDAUteacher[i - 7].doc_count)
          }
        }
        if (val.input_start_date === '' && val.input_end_date === '') {
          dispatch('a_makeActiveChartTable', userData)
        } else {
          dispatch('a_DateChange', userData)
        }
      }
    },
    a_CountryChange: ({dispatch}, val) => {
      let countryData = {
        title: '',
        input_start_date: val.input_start_date,
        input_end_date: val.input_end_date,
        dataDAU: [],
        changeDAU: [],
        dataWAU: [],
        dataMAU: []
      }

      if (val.select_country === 'Japan') {
        const dataDAUjapan = require('../DB/dau_japan.json')
        countryData.dataDAU = dataDAUjapan.slice(7, this.length)
        countryData.dataWAU = require('../DB/wau_japan.json')
        countryData.dataMAU = require('../DB/mau_japan.json')
        countryData.title = 'Japan '
        for (let i = 0; i < dataDAUjapan.length; i++) {
          if (dataDAUjapan[i - 7]) {
            countryData.changeDAU.push(dataDAUjapan[i].doc_count - dataDAUjapan[i - 7].doc_count)
          }
        }
        if (val.input_start_date === '' && val.input_end_date === '') {
          dispatch('a_makeActiveChartTable', countryData)
        } else {
          dispatch('a_DateChange', countryData)
        }
      } else if (val.select_country === 'Korea') {
        const dataDAUkorea = require('../DB/dau_korea.json')
        countryData.dataDAU = dataDAUkorea.slice(7, this.length)
        countryData.dataWAU = require('../DB/wau_korea.json')
        countryData.dataMAU = require('../DB/mau_korea.json')
        countryData.title = 'Korea '
        for (let i = 0; i < dataDAUkorea.length; i++) {
          if (dataDAUkorea[i - 7]) {
            countryData.changeDAU.push(dataDAUkorea[i].doc_count - dataDAUkorea[i - 7].doc_count)
          }
        }
        if (val.input_start_date === '' && val.input_end_date === '') {
          dispatch('a_makeActiveChartTable', countryData)
        } else {
          dispatch('a_DateChange', countryData)
        }
      }
    },

    // 로직 처리
    makeChangeData: (data) => {
      let changeData = []
      for (let i = 0; i < data.length; i++) {
        if (data[i - 7]) {
          changeData.push(data[i].doc_count - data[i - 7].doc_count)
        }
      }
      return changeData
    }
  }

})
