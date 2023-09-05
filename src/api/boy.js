import axios from '~/utils/axios'

const getBoyComics = async (page) => {
  try {
    const { data } = await axios.get(`/boy-comics?page=${page ? page : 1}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}


export { getBoyComics }