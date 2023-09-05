import React from 'react'
import { Link } from 'react-router-dom'

const HeadSlide = ({ title, icon, link }) => {
  return (
    <div className='flex justify-between items-center mt-6 mb-4 md:mt-12'>
      <h2 className='flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-bold text-white'>
        <span className='text-emerald-500'>{icon}</span> {title}
      </h2>
      <div>
        <Link to={link} className='cursor-pointer rounded-full px-3 py-0.5 overflow-hidden bg-transparent hover:border-transparent
        border-2 border-emerald-500 group hover:bg-emerald-500 text-emerald-500 hover:text-white hover:ring-2 hover:ring-offset-2 hover:ring-offset-zinc-700 hover:ring-emerald-400 duration-300'>
          More
        </Link>
      </div>
    </div>
  )
}

export default HeadSlide
