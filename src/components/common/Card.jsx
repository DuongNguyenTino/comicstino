import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import { RiUserFollowLine } from 'react-icons/ri'
import { formatNumber } from '~/utils/formatNumber'

const Card = ({ data }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {!loading ?
        <div
          className='overflow-hidden rounded-md duration-500 border-2
            border-emerald-300 relative group md:group-hover:shadow-md cursor-pointer'
          onClick={() => navigate(`/comic/${data.id}`)}>
          <div className='flex gap-1 absolute font-semibold top-0 inset-x-0 z-10 text-xs text-white'>
            {data?.is_trending && <span className='bg-rose-500 py-0.5 px-2 rounded-b-sm first:rounded-bl-none'>Hot</span>}
            {data?.status === 'Completed' && <span className='bg-sky-500 py-0.5 px-2 rounded-b-sm first:rounded-bl-none'>End</span>}
            {data.updated_at && data?.updated_at.includes('ngày') && <span className='bg-amber-500 py-0.5 px-2 rounded-b-sm first:rounded-bl-none'>Up</span>}
          </div>
          <div className='relative'>
            <img src={data?.thumbnail} alt={data?.title}
              className='w-[190px] mx-auto aspect-[2/3] object-cover object-center scale-[1.01] group-hover:scale-105
              duration-300 origin-bottom select-none' loading='lazy'/>
          </div>
          <div className='absolute top-1/2 bottom-0 inset-x-0 flex flex-col justify-end
          px-2 sm:px-4 py-2 bg-gradient-to-b from-transparent to-black'>
            <h5 className='font-bold leading-5 text-lg text-white group-hover:text-emerald-400 text-shadow
            duration-200 line-clamp-2'>{data?.title}</h5>
            <hr className='mt-3 mb-0.5 border-gray-500' />
            <div>
              <p className='text-sm text-gray-300 truncate font-semibold'>
                {data.genres && data.genres.map((item, index) => (
                  <>
                    <span key={item.id}>{item?.name} {index !== data.genres.length - 1 && <span>|</span>}</span>
                  </>
                ))}
              </p>
              {data.total_views && data.followers &&
                <div className='flex items-center gap-0.5 justify-center gap-x-2 gap-y-1 text-emerald-400 text-xs py-1 mt-0.5'>
                  <span className='flex items-center gap-1 bg-zinc-700 px-1 rounded'><FaEye />{formatNumber(data?.total_views)}</span>
                  <span className='flex items-center gap-1 bg-zinc-700 px-1 rounded'><RiUserFollowLine />{formatNumber(data?.followers)}</span>
                </div>
              }
            </div>
          </div>
        </div> :
        <div className='bg-zinc-800 overflow-hidden rounded-md duration-500 border-2
          border-slate-300 relative group min-w-[199px] w-full min-h-[289px] h-full bg-slate-50'>
          <div className='p-4 max-w-sm w-full mx-auto'>
            <div className='animate-pulse flex space-x-4'>
              <div className='flex-1 space-y-6 py-1'>
                <div className='h-[150px] bg-slate-300 rounded'></div>
                <div className='h-6 bg-slate-300 rounded-full'></div>
                <div className='space-y-3'>
                  <div className='h-1 bg-slate-300 rounded'></div>
                  <div className='grid grid-cols-2 gap-4 px-4'>
                    <div className='h-3 bg-slate-300 rounded-full col-span-1'></div>
                    <div className='h-3 bg-slate-300 rounded-full col-span-1'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Card
