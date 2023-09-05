import axios from '~/utils/axios'

const getNewComics = async (page, status) => {
  try {
    const { data } = await axios.get(`/new-comics?page=${page ? page : 1}&status=${status ? status : 'all'}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}


export { getNewComics }