import React, { useState } from 'react'
import { FaHistory } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import HistoryCard from '~/components/History/HistoryCard'

const HistoryPage = () => {
  const { history } = useSelector((state) => state.history)
  const [page, setPage] = useState(0)
  const comicPerPage = 20
  const arrButton = []
  const totalPages = Math.ceil(history.length / comicPerPage)
  const comicToShow = []

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    let startIndex = (currentPage - 1) * comicPerPage
    let endIndex = startIndex + comicPerPage

    if (currentPage === totalPages && history.length % comicPerPage !== 0) {
      const remainingComic = history.length % comicPerPage + 1
      endIndex = startIndex + remainingComic + 1
    }

    const pageComic = history.slice(startIndex, endIndex)

    arrButton.push({
      currentPage: currentPage
    })
    comicToShow.push(pageComic)
  }

  return (
    <main className='max-w-6xl mx-auto px-3 min-h-screen'>
      <h2 className='text-white flex items-center gap-2 text-xl md:text-3xl font-bold mb-6 mt-12'>
        <FaHistory size={30} className='text-emerald-500'/> Recently Read
      </h2>
      {history.length !== 0 ?
        <>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 md:gap-3 lg:gap-4'>
            {comicToShow[page]?.map(item => (
              <HistoryCard key={item.chapter_id} data={item}/>
            ))}
          </div>
          <div className='flex items-center justify-center gap-3 my-5 text-gray-300 font-semibold text-sm flex-wrap'>
            {arrButton.map((item) => (
              <button onClick={() => setPage(item.currentPage - 1)} key={item.currentPage} className={`text-lg px-3.5 py-1 rounded-full ${page + 1 === item.currentPage ? 'bg-emerald-500 text-white' : 'bg-zinc-700 hover:bg-zinc-600'}`}>
                {item.currentPage}
              </button>
            ))}
          </div>
        </>
        : <div className=''>
          <h3 className='text-2xl mt-8 font-bold text-gray-400 text-center'>No History</h3>
        </div>
      }
    </main>
  )
}

export default HistoryPage