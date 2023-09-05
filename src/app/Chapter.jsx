import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { AiOutlineRight } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { getDetailsComic, getSingleChapter } from '~/api/chapter'
import { addHistory } from '~/components/redux/feature/historySlice'

const ChapterPage = () => {
  const [data, setData] = useState([])
  const [chapter, setChapter] = useState([])
  const [currentChapter, setCurrentChapter] = useState('')
  const [currentComic, setCurrentComic] = useState('')
  const [valuePage, setValuePage] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [activeContact, setActiveContact] = useState(true)

  const [openListChapter, setOpenListChapter] = useState(false)
  const [disabledPrev, setDisabledPrev] = useState(false)
  const [disabledNext, setDisabledNext] = useState(false)
  let { comic_id, chapter_id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    (
      async () => {
        const dataApi = await getSingleChapter(comic_id, chapter_id)
        const dataDetail = await getDetailsComic(comic_id)
        if (dataApi && dataDetail) {
          setData(dataApi.images)
          setChapter(dataApi.chapters)
          setCurrentChapter(dataApi.chapter_name)
          setCurrentComic(dataApi.comic_name)
          let i = dataApi.chapters.findIndex(item => item.id.toString() === chapter_id)
          dispatch(addHistory({ comic_id: comic_id, chapter_id: chapter_id, chapter_name: dataApi.chapters[i].name, comic_name: dataApi.comic_name, thumbnail: dataDetail.thumbnail }))
        }
      }
    )()
  }, [comic_id, chapter_id, dispatch])

  useEffect(() => {
    if (chapter && chapter_id === chapter[chapter.length - 1]?.id.toString()) {
      setDisabledPrev(true)
    } else {
      setDisabledPrev(false)
    }
    if (chapter && chapter_id === chapter[0]?.id.toString()) {
      setDisabledNext(true)
    } else {
      setDisabledNext(false)
    }
  }, [chapter, chapter_id])

  useEffect(() => {
    document.getElementById(chapter_id) && document.getElementById(chapter_id).scrollIntoView({ behavior: 'smooth' })
  }, [chapter_id])

  useEffect(() => {
    const handleScroll = () => {
      // Tính toán vị trí cuộn hiện tại
      const scrollY = window.scrollY || document.documentElement.scrollTop
      let imageIndex = -1
      data.forEach((item, index) => {
        const element = document.getElementById(index + 1)
        if (element) {
          const elementRect = element.getBoundingClientRect()
          if (elementRect.top <= 0) {
            imageIndex = index + 1
          }
        }
      })
      if (imageIndex !== -1 && imageIndex !== currentImage) {
        setValuePage(imageIndex)
        setCurrentImage(imageIndex)
      }
    }
    // Đăng ký sự kiện cuộn
    window.addEventListener('scroll', handleScroll)
    // Xóa đăng ký sự kiện khi component bị hủy
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentImage, data])

  const handlePrevious = () => {
    setValuePage(1)
    window.scrollTo(0, 0)
    const index_newChapter = chapter.findIndex((item) => item.id.toString() === chapter_id)
    if (index_newChapter && chapter.length !== 0 && !disabledPrev) {
      navigate(`/comic/${comic_id}/${chapter[index_newChapter + 1].id}`)
    }
  }

  const handleNext = () => {
    setValuePage(1)
    window.scrollTo(0, 0)
    const index_newChapter = chapter.findIndex((item) => item.id.toString() === chapter_id)
    if (index_newChapter && chapter.length !== 0 && !disabledNext) {
      navigate(`/comic/${comic_id}/${chapter[index_newChapter - 1].id}`)
    }
  }

  return (
    <main className='bg-zinc-900 min-h-screen'>
      <div className='flex flex-col max-w-2xl mx-auto'>
        {data.length !== 0 && data.map((item, index) => (
          <img id={index + 1} key={item.page} src={item.src} alt={item.page} loading='lazy' className='w-full select-none border-b-4'/>
        ))}
      </div>
      <div onClick={() => setActiveContact(!activeContact)} className='fixed inset-0 top-12 md:top-14'>
        <div onClick={(e) => e.stopPropagation()} className={`flex items-center justify-center gap-2 select-none top-0 inset-x-0 bg-[rgba(0,0,0,0.9)] py-3 px-2
        text-gray-300 font-semibold duration-200 ${activeContact ? 'translate-y-0 opacity-1' : '-translate-y-full opacity-0'} `}>
          <Link to={`/comic/${comic_id}`}>{currentComic}</Link>
          <AiOutlineRight size={16} />
          <span>{currentChapter}</span>
        </div>
        <div onClick={(e) => e.stopPropagation()} className={`select-none absolute flex items-center flex-col-reverse justify-center gap-3 lg:flex-row lg:gap-8 py-2
        bottom-0 inset-x-0 bg-[rgba(0,0,0,0.75)] text-gray-400 text-sm font-semibold duration-300${activeContact ? 'translate-y-0 opacity-1' : 'translate-y-full opacity-0'}`}>
          <div className='items-center gap-2 hidden lg:flex'>
            <span className='w-16'>{valuePage} / {data.length}</span>
            <input type='range' min='1' value={valuePage} onChange={(e) =>
            {
              const newValuePage = Number(e.target.value)
              setValuePage(newValuePage)
              const imageElement = document.getElementById(e.target.value)
              if (imageElement) {
                imageElement.scrollIntoView({ behavior: 'smooth' })
              }
            }} max={data.length} step='1'/>
          </div>
          <div className='flex items-center gap-3'>
            <button onClick={handlePrevious} disabled={disabledPrev} className={`px-3 py-1 rounded-full ${disabledPrev ? 'bg-gray-200 text-gray-500' : 'bg-emerald-200 text-emerald-500'} `}>Previous</button>
            <button onClick={handleNext} disabled={disabledNext} className={`px-3 py-1 rounded-full ${disabledNext ? 'bg-gray-200 text-gray-500' : 'bg-emerald-200 text-emerald-500'} `}>Next</button>
            <button onClick={() => setOpenListChapter(!openListChapter)} className='px-3 py-1 rounded-full bg-fuchsia-200 text-fuchsia-500 relative'>
              Chapter
              <div className={`z-10 absolute bg-zinc-900 w-60 py-3 rounded bottom-9 text-white right-full translate-x-1/3 sm:translate-x-1/2 sm:right-1/2 text-left duration-200 origin-bottom ${openListChapter ? 'scale-100': 'scale-[0.001]'}`}>
                <h5 className='text-lg px-4 pb-1'>All Chapter ({chapter[0]?.name?.split(' ')[1]})</h5>
                <ul id='list_chapter' className='overflow-auto text-sm h-max max-h-72 font-normal'>
                  {chapter.length !== 0 && chapter.map((item) => (
                    <li key={item.id} onClick={() => {
                      setValuePage(1)
                      window.scrollTo(0, 0)
                    }}>
                      <Link
                        id={item.id}
                        to={`/comic/${comic_id}/${item.id}`}
                        aria-current={item.id.toString() === chapter_id ? 'page' : null}
                        className={`h-max block py-2 truncate px-5 duration-100 hover:bg-zinc-950 ${item.id.toString() === chapter_id ? 'text-emerald-500' : 'text-white'}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          </div>
          <span className='border-b rotate-90 w-4 border-gray-400 hidden lg:inline'></span>
          <button className='flex items-center gap-2 p-1'>
            <BsDownload size={20} className='text-white'/>
            Download
          </button>
        </div>
      </div>
    </main>
  )
}

export default ChapterPage