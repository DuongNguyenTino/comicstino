import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { useParams, useNavigate } from 'react-router-dom'

const SlideAllGenres = ({ items }) => {
  let { genre_id } = useParams()
  const navigate = useNavigate()

  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={'auto'}
        freeMode={true}
        modules={[FreeMode]}
        className='border-y'
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}
            onClick={() => {
              navigate(`/genres/${item.id}?page=1`)
            }}
            className={`px-5 py-3 select-none cursor-pointer ${item.id === genre_id ? 'bg-emerald-500 text-white': 'text-gray-300'} swiper-genres`}>
            {item.name}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default SlideAllGenres
