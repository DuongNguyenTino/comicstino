import axios from '~/utils/axios'

const getRecommend = async () => {
  try {
    const { data } = await axios.get('/recommend-comics')
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}


export { getRecommend }