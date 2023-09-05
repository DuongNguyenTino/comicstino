import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AiOutlineRight } from 'react-icons/ai'
import { getSearchByQuery } from '~/api/search'
import SearchCard from '~/components/Search/SearchCard'
import Panigation from '~/components/common/Panigation'

const SearchPage = () => {
  let [params, setParams] = useSearchParams()
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(0)
  const [query, setQuery] = useState('')
  const [dataSearch, setDataSearch] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    params.get('page') > 0 && setCurrentPage(params.get('page') - 1)
    params.get('q') && setQuery(params.get('q'))
  }, [params])

  useEffect(() => {
    (
      async () => {
        const dataSearchApi = await getSearchByQuery(query, currentPage + 1)
        if (dataSearchApi) {
          setDataSearch(dataSearchApi.comics)
          setTotalPage(dataSearchApi.total_pages)
          setIsLoading(false)
        } else {
          setIsLoading(true)
        }
      }
    )()
  }, [isLoading, currentPage, params, query])

  return (
    <main className='max-w-6xl px-3 mx-auto min-h-screen py-6'>
      <div className='text-gray-400 flex items-center flex-wrap gap-1 font-bold text-lg'>
        <Link to='/'>Home</Link>
        <AiOutlineRight size={16}/>
        <span>Search result</span>
        <AiOutlineRight size={16}/>
        <span className='text-white'>{query}</span>
      </div>
      {dataSearch && dataSearch.length === 0 ?
        <div className='h-96 min-h-max'>
          <h1 className='text-3xl font-bold text-gray-700 text-center pt-32'>Not result</h1>
        </div>
        :
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-6 py-5'>
          {
            dataSearch.map((item) => (
              <li key={item.id}>
                <SearchCard data={item}/>
              </li>
            ))
          }
        </ul>
      }
      <Panigation currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
    </main>
  )
}

export default SearchPage