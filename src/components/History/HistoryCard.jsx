import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiBookReader } from 'react-icons/bi'
import { BsFillJournalBookmarkFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { deleteHistory } from '../redux/feature/historySlice'

const HistoryCard = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/comic/${data.comic_id}`)}>
      <div className='overflow-hidden rounded-md duration-500 border-2 border-gray-400 md:hover:border-emerald-300
      relative group md:group-hover:shadow-md cursor-pointer'>
        <div className='relative '>
          <img src={data?.thumbnail} alt={data?.comic_name}
            className='w-full aspect-[2/3] object-cover object-center scale-[1.01] group-hover:scale-105
            duration-300 origin-bottom select-none' loading='lazy'/>
        </div>
        <div className='absolute top-1/2 bottom-0 inset-x-0 flex flex-col justify-end
          px-2 sm:px-4 py-2 bg-gradient-to-b from-transparent to-black'>
          <h5 className='font-bold leading-5 text-lg text-white group-hover:text-emerald-400 text-shadow duration-200 line-clamp-2'>
            <abbr title={data?.comic_name} className='no-underline'>{data?.comic_name}</abbr>
          </h5>
          <hr className='mt-3 mb-0.5 border-gray-500'/>
          <div className='text-gray-300'>
            <p className='text-sm font-semibold flex items-center gap-0.5 mb-1 text-fuchsia-400'>
              <BsFillJournalBookmarkFill size={18}/> {data?.chapter_name}
            </p>
            <div className='flex items-center gap-1 text-sm text-white'>
              <button onClick={(e) => {
                e.stopPropagation()
                navigate(`/comic/${data?.comic_id}/${data.chapter_id}`)
              }} className='bg-sky-500 duration-200 hover:bg-sky-600 w-full px-2 py-1 rounded-sm flex justify-center items-center gap-1'>
                <BiBookReader size={20}/> Continue
              </button>
              <button onClick={(e) => {
                e.stopPropagation()
                dispatch(deleteHistory(data.comic_id))
              }} className='bg-rose-500 px-2 py-1 rounded-sm duration-200 hover:bg-rose-600'>
                <RiDeleteBin6Line size={20}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryCard