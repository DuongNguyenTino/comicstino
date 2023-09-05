import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PiFilmSlateBold } from 'react-icons/pi'
import { getCompletedComics } from '~/api/completed'
import GridCard from '~/components/common/GridCard'
import Panigation from '~/components/common/Panigation'

const CompletedPage = () => {
  let [pageParams, setPageParams] = useSearchParams()
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    pageParams.get('page') > 0 && setCurrentPage(pageParams.get('page') - 1)
  }, [pageParams])

  useEffect(() => {
    (
      async () => {
        const dataApi = await getCompletedComics(currentPage + 1)
        if (dataApi) {
          setData(dataApi.comics)
          setTotalPage(dataApi.total_pages)
          setIsLoading(false)
        } else {
          setIsLoading(true)
        }
      }
    )()
  }, [isLoading, currentPage, pageParams])

  return (
    <main className='max-w-6xl mx-auto px-3'>
      <h2 className='text-white flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-bold mb-4 mt-4 md:mt-8'>
        <PiFilmSlateBold size={30} color='#10B981'/> Completed Update
      </h2>
      {data.length !== 0 &&
      <>
        <GridCard items={data}/>
        <Panigation currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
      </>
      }
    </main>
  )
}

export default CompletedPage
