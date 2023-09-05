import axios from '~/utils/axios'

const getRecentUpdateComics = async (page) => {
  try {
    const { data } = await axios.get(`/recent-update-comics?page=${page ? page : 1}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}


export { getRecentUpdateComics }