import axios from '~/utils/axios'

const getTrending = async (page) => {
  try {
    const { data } = await axios.get(`/trending-comics?page=${page ? page: 1}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

export { getTrending }