import axios from '~/utils/axios'

const getGirlComics = async (page) => {
  try {
    const { data } = await axios.get(`/girl-comics?page=${page ? page : 1}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}


export { getGirlComics }