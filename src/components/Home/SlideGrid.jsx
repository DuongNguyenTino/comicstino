
import { Swiper, SwiperSlide } from 'swiper/react'
import { Grid, Pagination, Navigation } from 'swiper/modules'
import Card from '../common/Card'

const SlideGrid = ({ items }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        grid = {{
          rows: 1,
          fill: 'row'
        }}
        navigation={true}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 5
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
            grid: {
              rows: 2,
              fill: 'row'
            }
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
            grid: {
              rows: 2,
              fill: 'row'
            }
          }
        }}
        modules={[Grid, Pagination, Navigation]}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Card data={item}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default SlideGrid
