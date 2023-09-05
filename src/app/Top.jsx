import React, { useState, useEffect } from 'react'
import { LiaSnowflakeSolid } from 'react-icons/lia'
import { MdOutlineStickyNote2 } from 'react-icons/md'
import { GoPeople } from 'react-icons/go'
import { FaRegComment } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'
import StatusComics from '~/components/Top/StatusComics'
import GridCard from '~/components/common/GridCard'
import Panigation from '~/components/common/Panigation'
import {
  getTopAllComic,
  getTopDailyComic,
  getTopWeeklyComic,
  getTopMonthlyComic,
  getTopChapter,
  getTopFollow,
  getTopComment
} from '~/api/top'

const TopPage = () => {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  const listTop = [
    {
      title: 'Top Comics',
      icon: <LiaSnowflakeSolid size={24}/>,
      top: 'comics',
      link: `?top=comics&page=1&status=${params.get('status')}`
    },
    {
      title: 'Top Daily',
      icon: <LiaSnowflakeSolid size={24}/>,
      link: `?top=daily&page=1&status=${params.get('status')}`,
      top: 'daily'
    },
    {
      title: 'Top Weekly',
      icon: <LiaSnowflakeSolid size={24}/>,
      link: `?top=weekly&page=1&status=${params.get('status')}`,
      top: 'weekly'
    },
    {
      title: 'Top Monthly',
      icon: <LiaSnowflakeSolid size={24}/>,
      link: `?top=monthly&page=1&status=${params.get('status')}`,
      top: 'monthly'
    },
    {
      title: 'Top Chapter',
      icon: <MdOutlineStickyNote2 size={24}/>,
      link: `?top=chapter&page=1&status=${params.get('status')}`,
      top: 'chapter'
    },
    {
      title: 'Top Follow',
      icon: <GoPeople size={24}/>,
      link: `?top=follow&page=1&status=${params.get('status')}`,
      top: 'follow'
    },
    {
      title: 'Top Comment',
      icon: <FaRegComment size={24}/>,
      link: `?top=comment&page=1&status=${params.get('status')}`,
      top: 'comment'
    }
  ]

  const [dataTopComics, setDataTopComics] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    params.get('page') > 0 && setCurrentPage(params.get('page') - 1)
  }, [params])

  useEffect(() => {
    (
      async () => {
        let dataTopComicsApi
        switch (params.get('top')) {
        case 'comics':
          dataTopComicsApi = await getTopAllComic(currentPage + 1, params.get('status'))
          if (dataTopComicsApi) {
            setDataTopComics(dataTopComicsApi.comics)
            setTotalPage(dataTopComicsApi.total_pages)
            setIsLoading(false)
          } else {
            setIsLoading(true)
          }
          break
        case 'daily':
          dataTopComicsApi = await getTopDailyComic(currentPage + 1, params.get('status'))
          if (dataTopComicsApi) {
            setDataTopComics(dataTopComicsApi.comics)
            setTotalPage(dataTopComicsApi.total_pages)
            setIsLoading(false)
          } else {
            setIsLoading(true)
          }
          break
        case 'weekly':
          dataTopComicsApi = await getTopWeeklyComic(currentPage + 1, params.get('status'))
          if (dataTopComicsApi) {
            setDataTopComics(dataTopComicsApi.comics)
            setTotalPage(dataTopComicsApi.total_pages)
            setIsLoading(false)
          } else {
            setIsLoading(true)
          }
          break
        case 'monthly':
          dataTopComicsApi = await getTopMonthlyComic(currentPage + 1, params.get('status'))
          if (dataTopComicsApi) {
            setDataTopComics(dataTopComicsApi.comics)
            setTotalPage(dataTopComicsApi.total_pages)
            setIsLoading(false)
          } else {
            setIsLoading(true)
          }
          break
        case 'chapter':
          dataTopComicsApi = await getTopChapter(currentPage + 1, params.get('status'))
          if (dataTopComicsApi) {
            setDataTopComics(dataTopComicsApi.comics)
            setTotalPage(dataTopComicsApi.total_pages)
            setIsLoading(false)
          } else {
            setIsLoading(true)
          }
          break
        case 'follow':
          dataTopComicsApi = await getTopFollow(currentPage + 1, params.get('status'))
          if (dataTopComicsApi) {
            setDataTopComics(dataTopComicsApi.comics)
            setTotalPage(dataTopComicsApi.total_pages)
            setIsLoading(false)
          } else {
            setIsLoading(true)
          }
          break
        case 'comment':
          dataTopComicsApi = await getTopComment(currentPage + 1, params.get('status'))
          if (dataTopComicsApi) {
            setDataTopComics(dataTopComicsApi.comics)
            setTotalPage(dataTopComicsApi.total_pages)
            setIsLoading(false)
          } else {
            setIsLoading(true)
          }
          break
        default:
          dataTopComicsApi = await getTopAllComic(currentPage + 1, params.get('status'))
          if (dataTopComicsApi) {
            setDataTopComics(dataTopComicsApi.comics)
            setTotalPage(dataTopComicsApi.total_pages)
            setIsLoading(false)
          } else {
            setIsLoading(true)
          }
          break
        }
      }
    )()
  }, [isLoading, params, currentPage])

  return (
    <main className='max-w-6xl mx-auto px-3'>
      <ul className='flex flex-wrap items-center gap-1.5 mt-5 sm:gap-3'>
        {listTop.map((item) => (
          <li key={item.title}
            onClick={() => navigate(item.link)}
            className={`text-gray-300 flex items-center gap-1 px-3 py-2 rounded cursor-pointer duration-150 select-none ${params.get('top') === item.top ? 'bg-emerald-500 text-white' : ''}`}>
            {item.icon} {item.title}
          </li>
        ))}
      </ul>
      <StatusComics top={params.get('top')}/>
      {dataTopComics.length !== 0 &&
      <>
        <GridCard items={dataTopComics}/>
        <Panigation totalPage={totalPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </>
      }
    </main>
  )
}

export default TopPage