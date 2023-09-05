import axios from '~/utils/axios'

const getDetailsComic = async (comic_id) => {
  try {
    const { data } = await axios.get(`/comics/${comic_id}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

const getComicChapters = async (comic_id) => {
  try {
    const { data } = await axios.get(`/comics/${comic_id}/chapters`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}

const getSingleChapter = async (comic_id, chapter_id) => {
  try {
    const { data } = await axios.get(`/comics/${comic_id}/chapters/${chapter_id}`)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err)
  }
}


export { getDetailsComic, getComicChapters, getSingleChapter }