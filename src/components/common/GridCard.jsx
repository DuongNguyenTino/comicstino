import React from 'react'
import Card from './Card'

const GridCard = ({ items }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2 md:gap3 lg:gap-4'>
      {items.map((item, index) => (
        <Card key={index} data={item} />
      ))}
    </div>
  )
}

export default GridCard