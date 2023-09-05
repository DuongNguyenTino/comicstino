import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MdOutlineTipsAndUpdates } from 'react-icons/md'
import { getNewComics } from '~/api/new'
import GridCard from '~/components/common/GridCard'
import Panigation from '~/components/common/Panigation'

const NewPage = () => {
  let [pageParams, setPageParams] = useSearchParams()
  const [dataNew, setDataNew] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const [status, setStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    pageParams.get('page') > 0 && setCurrentPage(pageParams.get('page') - 1)
    pageParams.get('status') && setStatus(pageParams.get('status'))
  }, [pageParams])

  useEffect(() => {
    (
      async () => {
        const dataNewApi = await getNewComics(currentPage + 1, status)
        if (dataNewApi) {
          setDataNew(dataNewApi.comics)
          setTotalPage(dataNewApi.total_pages)
          setIsLoading(false)
        } else {
          setIsLoading(true)
        }
      }
    )()
  }, [isLoading, currentPage, status, pageParams])

  return (
    <main className='max-w-6xl mx-auto px-3'>
      <h2 className='text-white flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-bold mb-4 mt-4 md:mt-8'>
        <MdOutlineTipsAndUpdates size={30} color='#10B981'/> New Comics
      </h2>
      {dataNew.length !== 0 &&
      <>
        <GridCard items={dataNew}/>
        <Panigation currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
      </>
      }
    </main>
  )
}

export default NewPage
