import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const StatusComics = ({ top }) => {
  let [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  const listStatus = [
    {
      title: 'All',
      status: 'all'
    },
    {
      title: 'Completed',
      status: 'completed'
    },
    {
      title: 'Ongoing',
      status: 'ongoing'
    }
  ]

  return (
    <ul className='flex items-center flex-wrap gap-2.5 mb-5 mt-3 font-semibold sm:gap-5'>
      {listStatus.map((item, index) => (
        <li key={index} onClick={() => navigate(`?${top ? 'top='+top+'&' : ''}page=1&status=${item.status}`)} className={`min-w-[60px] cursor-pointer text-center px-3 py-1.5 rounded ${item.status === params.get('status') ? 'text-emerald-500 border border-emerald-500': 'border text-gray-300'}`}>
          {item.title}
        </li>
      ))}
    </ul>
  )
}

export default StatusComics