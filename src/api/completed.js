import axios from '~/utils/axios'

const getCompletedComics = async (page) => {
  try {
    const { data } = await axios.get(`/completed-comics?page=${page ? page : 1}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}


export { getCompletedComics }