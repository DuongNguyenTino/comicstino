import React from 'react'
import { Link } from 'react-router-dom'

const SearchCard = ({ data }) => {
  return (
    <Link to={`/comics/${data?.id}`}
      className='flex flex-col sm:flex-row gap-4 rounded-lg border border-gray-400 bg-zinc-800 hover:bg-zinc-700 duration-200 p-4'>
      <img src={data?.thumbnail} alt={data?.title}
        className='rounded aspect-[2/3] w-44 mx-auto sm:h-36 border border-emerald-500 object-cover'/>
      <div className='text-gray-400 font-bold w-full'>
        <h3 className='text-lg text-white leading-5 line-clamp-2'>
          {data?.title}
          <span className='text-sm text-gray-400'>({data?.last_chapter?.name})</span>
        </h3>
        <p className='text-sm line-clamp-2 font-semibold'>
          {data?.short_description}
        </p>
        <ul className='text-sm flex items-center flex-wrap gap-2 mt-1'>
          {data.genres && data.genres.map(item => (
            <li key={item.id} className='bg-cyan-200 text-cyan-900 text-xs px-2.5 py-0.5 rounded-full'>{item.name}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

export default SearchCard