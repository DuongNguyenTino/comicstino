import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from '../common/Card'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'

const SlideSuggest = ({ items }) => {
  return (
    <Swiper
      effect={'coverflow'}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        modifier: 1,
        slideShadows: true
      }}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 5
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 10
        }
      }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <Card data={item}/>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SlideSuggest
