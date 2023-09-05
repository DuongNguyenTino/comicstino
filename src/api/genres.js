import axios from '~/utils/axios'

const getAllGenres = async () => {
  try {
    const { data } = await axios.get('/genres')
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

const getComicsByGenre = async (genre_id, page) => {
  try {
    const { data } = await axios.get(`/genres/${genre_id}?page=${page ? page : 1}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

export { getAllGenres, getComicsByGenre }