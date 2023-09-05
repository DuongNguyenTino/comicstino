import axios from '~/utils/axios'

const getSearchByQuery = async (query, page) => {
  try {
    const { data } = await axios.get(`/search?q=${query}&page=${page ? page : 1}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

const getSearchSuggest = async (query) => {
  try {
    const { data } = await axios.get(`/search-suggest?q=${query}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

export { getSearchByQuery, getSearchSuggest }