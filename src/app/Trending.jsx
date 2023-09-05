import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BiTrendingUp } from 'react-icons/bi'
import { getTrending } from '~/api/trending'
import GridCard from '~/components/common/GridCard'
import Panigation from '~/components/common/Panigation'

const TrendingPage = () => {
  let [pageParams, setPageParams] = useSearchParams()
  const [dataTrending, setDataTrending] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    pageParams.get('page') > 0 && setCurrentPage(pageParams.get('page') - 1)
  }, [pageParams])

  useEffect(() => {
    (
      async () => {
        const dataTrendingApi = await getTrending(currentPage + 1)
        if (dataTrendingApi) {
          setDataTrending(dataTrendingApi.comics)
          setTotalPage(dataTrendingApi.total_pages)
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
        <BiTrendingUp size={30} className='text-emerald-500'/> Trending Comics
      </h2>
      {dataTrending.length !== 0 &&
      <>
        <GridCard items={dataTrending}/>
        <Panigation currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
      </>
      }
    </main>
  )
}

export default TrendingPage
