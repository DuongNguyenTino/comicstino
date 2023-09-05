import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { LuLayoutTemplate } from 'react-icons/lu'
import { BsInfoCircleFill } from 'react-icons/bs'
import { getAllGenres } from '~/api/genres'
import { getComicsByGenre } from '~/api/genres'
import SlideAllGenres from '~/components/Genres/SlideAllGenres'
import GridCard from '~/components/common/GridCard'
import Panigation from '~/components/common/Panigation'

const GenresPage = () => {
  let [pageParams, setPageParams] = useSearchParams()
  const navigate = useNavigate()
  let { genre_id } = useParams()
  const [dataAllGenres, setDataAllGenres] = useState([])
  const [dataComics, setDataComics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    pageParams.get('page') > 0 && setCurrentPage(pageParams.get('page') - 1)
  }, [pageParams])

  useEffect(() => {
    (
      async () => {
        const dataAllGenresApi = await getAllGenres()
        const dataComicsApi = await getComicsByGenre(genre_id, currentPage + 1)
        if (dataAllGenresApi && dataComicsApi) {
          setDataAllGenres(dataAllGenresApi)
          setDataComics(dataComicsApi.comics)
          setTotalPage(dataComicsApi.total_pages)
          setIsLoading(false)
        } else {
          setIsLoading(true)
        }
      }
    )()
  }, [isLoading, genre_id, currentPage, pageParams])

  return (
    <main className='max-w-6xl mx-auto px-3'>
      <h2 className='text-white flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-bold mb-4 mt-4 md:mt-8'>
        <LuLayoutTemplate size={30} color='#10B981'/> Genres
      </h2>
      {dataAllGenres.length !== 0 &&
      <>
        <SlideAllGenres items={dataAllGenres} setCurrentPage={setCurrentPage} />
        {dataAllGenres.map((item) => (
          item.id === genre_id &&
          <p key={item.id} className='my-5 flex items-center gap-2 px-3 py-2 rounded bg-sky-500 text-white'>
            <BsInfoCircleFill size={24} className='min-w-[24px]'/> {item?.description}
          </p>
        ))}
      </>
      }
      {dataComics.length !== 0 &&
      <>
        <GridCard items={dataComics}/>
        <Panigation currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
      </>
      }
    </main>
  )
}

export default GenresPage