import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiLoaderCircle } from 'react-icons/bi'
import { FaEye } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import { LiaBookSolid } from 'react-icons/lia'
import { BsBook } from 'react-icons/bs'
import { getDetailsComic } from '~/api/chapter'
import { formatNumberDetail } from '~/utils/formatNumberDetail'

const ComicDetailsPage = () => {
  const [dataDetails, setDataDetails] = useState({})
  const [dataChapters, setDataChapters] = useState([])
  const [page, setPage] = useState(0)
  const navigate = useNavigate()
  let { comic_id } = useParams()

  useEffect(() => {
    (
      async () => {
        const dataDetailsApi = await getDetailsComic(comic_id)
        if (dataDetailsApi) {
          setDataDetails(dataDetailsApi)
          setDataChapters(dataDetailsApi.chapters)
        }
      }
    )()
  }, [comic_id])

  const chaptersPerPage = 50
  const arrButton = []
  const totalPages = Math.ceil(dataChapters.length / chaptersPerPage)
  const chaptersToShow = []

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    let startIndex = dataChapters.length - (currentPage - 1) * chaptersPerPage
    let endIndex = startIndex - chaptersPerPage

    if (currentPage === totalPages && dataChapters.length % chaptersPerPage !== 0) {
      const remainingChapters = dataChapters.length % chaptersPerPage + 1
      endIndex = startIndex - remainingChapters + 1
    }

    const pageChapters = dataChapters.slice(endIndex, startIndex).reverse()

    arrButton.push({
      currentPage: currentPage,
      title: `${pageChapters[0]?.name?.split(' ')[1]}-${pageChapters[pageChapters.length - 1]?.name?.split(' ')[1]}`
    })
    chaptersToShow.push(pageChapters)
  }

  return (
    <div className='relative pt-12 px-4 min-h-screen'>
      <div className='absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-emerald-300 -z-10'></div>
      <div className='max-w-5xl mx-auto border-4 border-transparent p-0 rounded-xl sm:grid sm:grid-cols-4
      gap-6 md:p-4 md:border-gray-300'>
        <div className='aspect-[2/3] w-56 mx-auto sm:w-full rounded-lg border-2 overflow-hidden border-emerald-500
        relative sm:col-span-1'>
          <img src={dataDetails?.thumbnail} alt={dataDetails?.title}
            className='w-full h-full object-cover' draggable={false}/>
        </div>
        <div className='sm:col-span-3'>
          <h4 className='text-white text-3xl font-extrabold mt-5 sm:mt-0'>
            {dataDetails?.title}
          </h4>
          <p className='mb-3 mt-1 text-sm font-semibold text-gray-300'>
            {dataDetails.other_names && dataDetails.other_names.map((item, index) => index !== dataDetails.other_names.length - 1 ? item + ' | ' : item)}
          </p>
          <div className='font-bold text-sm flex flex-wrap items-center gap-2 my-1'>
            {dataDetails.genres && dataDetails.genres.map((item, index) => (
              <Link key={item.id} to={`/genres/${item.id}`}
                className='text-gray-100 px-2 py-0.5 rounded bg-transparent border-2 border-emerald-300 duration-100 hover:bg-emerald-500'>
                {item.name}
              </Link>
            ))}
          </div>
          <div className='font-semibold flex items-center my-1'>
            {dataDetails.authors && dataDetails.authors === 'Updating' ?
              <span className='text-gray-200 flex items-center gap-2'>Creator: <BiLoaderCircle size={24} color='#10b891'/> {dataDetails.authors}</span> :
              <span className='text-gray-200 flex items-center gap-2'>Creator: <span className='text-fuchsia-400'>{dataDetails.authors}</span></span>
            }
          </div>
          <div className='flex items-center flex-wrap font-bold text-gray-800 gap-x-4 gap-y-1'>
            <span className='text-gray-200 flex items-center gap-1'>
              <FaEye size={20} className='text-sky-500'/> {formatNumberDetail(dataDetails?.total_views)}
            </span>
            <span className='text-gray-200 flex items-center gap-1'>
              <AiFillHeart size={20} className='text-rose-500'/> {formatNumberDetail(dataDetails?.followers)}
            </span>
          </div>
          <div className='mt-2'>
            <p className='text-gray-200 line-clamp-5'>{dataDetails?.description}</p>
          </div>
          <div className='flex flex-col sm:flex-row items-center gap-3 mt-5 font-bold'>
            <button onClick={() => navigate(`/comic/${comic_id}/${dataChapters[dataChapters.length - 1].id}`)} className='flex items-center gap-1 border-2 rounded text-white text-lg px-6 py-2
            border-emerald-500 bg-emerald-500'>
              <LiaBookSolid size={24} /> Read Now
            </button>
            <button className='flex items-center gap-1 border-2 rounded text-emerald-500 text-lg px-6 py-2
            border-emerald-500 bg-white'><BsDownload size={24}/> Download</button>
          </div>
        </div>
      </div>
      <div className='max-w-5xl mx-auto mt-5'>
        <div className='flex items-center gap-1 sm:gap-2 text-emerald-500 font-bold text-lg sm:text-2xl border-b-2 py-1'>
          <BsBook size={20} /> Chapters
        </div>
        <div className='flex items-center gap-3 my-5 text-gray-300 font-semibold text-sm flex-wrap'>
          {arrButton.map((item) => (
            <button onClick={() => setPage(item.currentPage - 1)} key={item.currentPage} className={`px-2 py-0.5 rounded-full ${page + 1 === item.currentPage ? 'bg-emerald-100 text-emerald-500' : 'bg-zinc-700'}`}>
              {item.title}
            </button>
          ))}
        </div>
        <ul className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {chaptersToShow[page]?.map((chapter) => (
            <Link key={chapter.id} to={`/comic/${comic_id}/${chapter.id}`} className='text-gray-300 border rounded px-3 py-2 truncate hover:bg-zinc-700 duration-100'>
              <abbr title={chapter.name} className='no-underline'>{chapter.name}</abbr>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ComicDetailsPage