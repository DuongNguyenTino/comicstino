import React, { useEffect, useState } from 'react'
import { BiTrendingUp } from 'react-icons/bi'
import { PiFilmSlateBold } from 'react-icons/pi'
import { RxUpdate } from 'react-icons/rx'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { getTrending } from '~/api/trending'
import { getRecommend } from '~/api/recommend'
import SlideSuggest from '~/components/Home/SlideSuggest'
import SlideGrid from '~/components/Home/SlideGrid'
import { getCompletedComics } from '~/api/completed'
import { getBoyComics } from '~/api/boy'
import { getGirlComics } from '~/api/girl'
import { getRecentUpdateComics } from '~/api/recent-update'
import HeadSlide from '~/components/Home/HeadSlide'

const HomePage = () => {
  const [dataTrending, setDataTrending] = useState([])
  const [dataRecommend, setDataRecommend] = useState([])
  const [dataCompleted, setDataCompleted] = useState([])
  const [dataRecentlyUpdate, setDataRecentlyUpdate] = useState([])
  const [dataBoy, setDataBoy] = useState([])
  const [dataGirl, setDataGirl] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (
      async () => {
        const dataTrendingApi = await getTrending()
        const dataRecommendApi = await getRecommend()
        const dataCompletedApi = await getCompletedComics()
        const dataRecentlyUpdateApi = await getRecentUpdateComics()
        const dataBoyApi = await getBoyComics()
        const dataGirlApi = await getGirlComics()

        if (
          dataRecommendApi
          && dataTrendingApi
          && dataCompletedApi
          && dataRecentlyUpdateApi
          && dataBoyApi
          && dataGirlApi
        ) {
          setDataRecommend(dataRecommendApi.comics ? dataRecommendApi.comics : dataRecommendApi)
          setDataTrending(dataTrendingApi.comics ? dataTrendingApi.comics : dataTrendingApi)
          setDataCompleted(dataCompletedApi.comics ? dataCompletedApi.comics : dataCompletedApi)
          setDataRecentlyUpdate(dataRecentlyUpdateApi.comics ? dataRecentlyUpdateApi.comics : dataRecentlyUpdateApi)
          setDataBoy(dataBoyApi.comics ? dataBoyApi.comics : dataBoyApi)
          setDataGirl(dataGirlApi.comics ? dataGirlApi.comics : dataGirlApi)
          setIsLoading(false)
        } else {
          setIsLoading(true)
        }
      }
    )()
  }, [isLoading])

  const gridSlideData = [
    {
      title: 'Trending Comics',
      link: '/trending',
      icon: <BiTrendingUp size={24} />,
      metadata: dataTrending
    },
    {
      title: 'Completed Comics',
      link: '/completed',
      icon: <PiFilmSlateBold size={24} />,
      metadata: dataCompleted
    },
    {
      title: 'Recently Update',
      link: '/rencent-update',
      icon: <RxUpdate size={24} />,
      metadata: dataRecentlyUpdate
    },
    {
      title: 'Boy Comics',
      link: '/boy',
      icon: <BsGenderMale size={24} />,
      metadata: dataBoy
    },
    {
      title: 'Girl Comics',
      link: '/girl',
      icon: <BsGenderFemale size={24} color='#10B981'/>,
      metadata: dataGirl
    }
  ]

  return (
    <>
      { isLoading ? <div>Loading</div> :
        <div className='max-w-6xl mx-auto py-5 px-3'>
          {dataRecommend.length !== 0 && <SlideSuggest items={dataRecommend} />}
          {gridSlideData.map((item) => (
            <div key={item.title}>
              <HeadSlide title={item.title} link={item.link} icon={item.icon}/>
              {item.metadata.length !== 0 && <SlideGrid items={item.metadata} />}
            </div>
          ))}
        </div>
      }
    </>
  )
}

export default HomePage