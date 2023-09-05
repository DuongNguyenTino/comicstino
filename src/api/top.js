import axios from '~/utils/axios'

const getTopAllComic = async (page, status) => {
  try {
    const { data } = await axios.get(`/top?page=${page ? page : 1}&status=${status ? status : 'all'}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

const getTopDailyComic = async (page, status) => {
  try {
    const { data } = await axios.get(`/top/daily?page=${page ? page : 1}&status=${status ? status : 'all'}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

const getTopWeeklyComic = async (page, status) => {
  try {
    const { data } = await axios.get(`/top/weekly?page=${page ? page : 1}&status=${status ? status : 'all'}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

const getTopMonthlyComic = async (page, status) => {
  try {
    const { data } = await axios.get(`/top/monthly?page=${page ? page : 1}&status=${status ? status : 'all'}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

const getTopChapter = async (page, status) => {
  try {
    const { data } = await axios.get(`/top/chapter?page=${page ? page : 1}&status=${status ? status : 'all'}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

const getTopFollow = async (page, status) => {
  try {
    const { data } = await axios.get(`/top/follow?page=${page ? page : 1}&status=${status ? status : 'all'}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

const getTopComment = async (page, status) => {
  try {
    const { data } = await axios.get(`/top/comment?page=${page ? page : 1}&status=${status ? status : 'all'}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}


export {
  getTopAllComic,
  getTopDailyComic,
  getTopWeeklyComic,
  getTopMonthlyComic,
  getTopChapter,
  getTopComment,
  getTopFollow
}