import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHistory } from 'react-icons/fa'
import { GoSearch } from 'react-icons/go'
import { AiOutlineMenu, AiOutlineClose, AiOutlineHome } from 'react-icons/ai'
import { BiTrendingUp } from 'react-icons/bi'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { GiTrophyCup } from 'react-icons/gi'
import { MdOutlineTipsAndUpdates } from 'react-icons/md'
import { PiFilmSlateBold } from 'react-icons/pi'
import { LuLayoutTemplate } from 'react-icons/lu'
import { RxUpdate } from 'react-icons/rx'
import Logo from '~/assets/logo.svg'
import { useSelector } from 'react-redux'
import { getSearchSuggest } from '~/api/search'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [search, setSearch] = useState('')
  const [searchSuggest, setSearchSuggest] = useState([])
  const [hiddenSearchSuggest, setHiddenSearchSuggest] = useState(false)
  const { appState } = useSelector((state) => state.appState)
  const refForm = useRef()
  const navigate = useNavigate()

  const menuWeb = [
    {
      title: 'Home',
      link: '/',
      state: 'home'
    },
    {
      title: 'Genres',
      link: '/genres/all',
      state: 'genres'
    },
    {
      title: 'New',
      link: '/new',
      state: 'new'
    },
    {
      title: 'Top',
      link: '/top?top=comics&status=all',
      state: 'top'
    }
  ]

  const menuMobile = [
    {
      title: 'Home',
      link: '/',
      icon: <AiOutlineHome size={22} />,
      state: 'home'
    },
    {
      title: 'Genres',
      link: '/genres/all',
      icon: <LuLayoutTemplate size={22} />,
      state: 'genres'
    },
    {
      title: 'New Comics',
      link: '/new',
      icon: <MdOutlineTipsAndUpdates size={22} />,
      state: 'new'
    },
    {
      title: 'Top',
      link: '/top?top=comics&status=all',
      icon: <GiTrophyCup size={22} />,
      state: 'top'
    },
    {
      title: 'Trending Comics',
      link: '/trending',
      icon: <BiTrendingUp size={22} />,
      state: 'trending'
    },
    {
      title: 'Completed Comics',
      link: '/completed',
      icon: <PiFilmSlateBold size={22} />,
      state: 'completed'
    },
    {
      title: 'Recently Update',
      link: '/recent-update',
      icon: <RxUpdate size={22} />,
      state: 'recent-update'
    },
    {
      title: 'Boy Comics',
      link: '/boy',
      icon: <BsGenderMale size={22} />,
      state: 'boy'
    },
    {
      title: 'Girl Comics',
      link: '/girl',
      icon: <BsGenderFemale size={22} />,
      state: 'girl'
    },
    {
      title: 'History',
      link: '/history',
      icon: <FaHistory size={22} />,
      state: 'history'
    }
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (refForm.current && !refForm.current.contains(e.target)) {
        setHiddenSearchSuggest(true)
      }
    }
    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleChangeQuery = (e) => {
    if (e.target.value.trim() !== '') {
      setSearch(e.target.value)
      setHiddenSearchSuggest(false);
      (
        async () => {
          const data = await getSearchSuggest(e.target.value)
          setSearchSuggest(data)
        }
      )()
    } else {
      setSearch('')
      setSearchSuggest([])
      setHiddenSearchSuggest(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.trim() !== '') {
      navigate(`/search?q=${search}`)
      setOpenMenu(false)
      setSearch('')
      setSearchSuggest([])
    }
  }

  return (
    <header className='sticky top-0 inset-x-0 shadow shadow-zinc-700 bg-zinc-900 relative z-50'>
      <nav className='max-w-7xl h-12 md:h-14 mx-auto flex items-center justify-between px-3'>
        <div className='flex items-center gap-2 h-full'>
          <Link to='/' className='flex items-center gap-2 h-full select-none'>
            <img src={Logo} alt='ComicsTino' className='h-12 py-2 object-cover' />
            <h1 className='text-3xl font-bold text-emerald-500 '>ComicsTino</h1>
          </Link>
          <ul className='items-center gap-2 text-xl ml-6 hidden lg:flex'>
            {menuWeb.map((item) => (
              <li key={item.state}>
                <Link to={item.link} className={` block px-4 py-2 duration-150 font-bold text-white ${appState.includes(item.state) ? 'bg-emerald-500 text-white rounded-full': 'hover:text-emerald-500'}`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='hidden lg:flex items-center gap-4 '>
          <Link to='/history' className='text-blue-500'>
            <FaHistory size={26} />
          </Link>
          <form className='w-[340px] flex items-center justify-between rounded-full border py-2 focus-within:border-emerald-500
          duration-100 mx-4 relative' onSubmit={handleSubmit}>
            <input type='text' className='outline-none text-sm pl-6 rounded-full flex-1 bg-zinc-900 text-white' placeholder='Search comics and authors' value={search} onChange={handleChangeQuery}/>
            <button type='submit' className='flex items-center px-3'>
              <GoSearch size={22} className='text-white'/>
            </button>
            <ul className={`absolute top-11 left-1/2 -translate-x-1/2 w-full h-max max-h-80 overflow-y-auto overflow-x-hidden shadow shadow-zinc-500 rounded bg-zinc-900 ${hiddenSearchSuggest ? 'hidden' : ''}`}>
              {searchSuggest.length !== 0 && searchSuggest.map((item) => (
                <li onClick={() => {
                  navigate(`/comic/${item.id}`)
                  setOpenMenu(false)
                  setSearch('')
                  setSearchSuggest([])
                }} key={item.id} className='flex gap-2 p-2 border-b hover:bg-zinc-700 duration-100 cursor-pointer'>
                  <img src={item.thumbnail} alt={item.title}
                    className='border border-emerald-500 w-16 h-22 object-cover object-center rounded'/>
                  <div>
                    <h6 className='font-bold text-sm text-white'>
                      {item.title}
                      <span className='font-normal'>({item.lastest_chapter})</span>
                    </h6>
                    <p className='text-sm font-bold text-emerald-500 flex items-center gap-1'>
                      {item.authors}
                    </p>
                    <p className='text-xs text-gray-300 font-semibold flex items-center flex-wrap'>
                      {item.genres && item.genres.map((genre, index) => (
                        <span key={index}>{genre}{index !== item.genres.length - 1 && ', '}</span>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </form>

        </div>
        <div className='lg:hidden'>
          <button className='text-white' onClick={() => setOpenMenu(true)}>
            <AiOutlineMenu size={30}/>
          </button>
          <div onClick={() => setOpenMenu(false)} className={`fixed inset-0 bg-[rgba(0,0,0,0.85)] duration-200 shadow shadow-zinc-100 ${openMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} `}>
            <div id='menu_modal' onClick={(e) => e.stopPropagation()} className={`absolute right-0 inset-y-0 bg-zinc-900 p-5 pt-3 w-11/12 max-w-sm duration-200 ${openMenu ? 'translate-x-0' : 'translate-x-full'}`}>
              <button className='ml-auto block w-max mb-2' onClick={() => setOpenMenu(false)}>
                <AiOutlineClose size={22} className='text-white' />
              </button>
              <form ref={refForm} className='flex items-center rounded-full border py-2 focus-within:border-emerald-500
              duration-100 relative mb-3' onSubmit={handleSubmit}>
                <input type='text' className='outline-none text-sm pl-3 rounded-full w-full bg-zinc-900 text-white'
                  placeholder='Search...' value={search} onChange={handleChangeQuery}/>
                <button type='submit' className='flex items-center px-3'>
                  <GoSearch size={22} className='text-white'/>
                </button>
                <ul className={`absolute top-11 left-1/2 -translate-x-1/2 w-full h-max max-h-80 overflow-x-hidden overflow-y-auto shadow shadow-zinc-500 rounded bg-zinc-900 ${hiddenSearchSuggest ? 'hidden' : ''}`}>
                  {searchSuggest.length !== 0 && searchSuggest.map((item) => (
                    <li onClick={() => {
                      navigate(`/comic/${item.id}`)
                      setOpenMenu(false)
                      setSearch('')
                      setSearchSuggest([])
                    }} key={item.id} className='flex gap-2 p-2 border-b hover:bg-zinc-700 duration-100 cursor-pointer'>
                      <img src={item.thumbnail} alt={item.title}
                        className='border border-emerald-500 w-16 h-22 object-cover object-center rounded'/>
                      <div>
                        <h6 className='font-bold text-sm wrap text-white'>
                          {item.title}
                          <span className='font-normal'>({item.lastest_chapter})</span>
                        </h6>
                        <p className='text-sm font-bold text-emerald-500 flex items-center gap-1'>
                          {item.authors}
                        </p>
                        <p className='text-xs text-gray-300 font-semibold flex items-center flex-wrap'>
                          {item.genres && item.genres.map((genre, index) => (
                            <span key={index} className='text-center'>{genre}{index !== item.genres.length - 1 && ', '}</span>
                          ))}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </form>
              <ul className='grid gap-3 text-lg font-semibold mt-4'>
                {menuMobile.map((item, index) => (
                  <li key={item.state} onClick={() => setOpenMenu(false)}>
                    <Link to={item.link} className={`flex items-center gap-3 text-xl border-b ${index === menuMobile.length - 1 ? 'border-transparent' : 'border-zinc-500'} p-2 duration-200 ${appState.includes(item.state) ? 'text-emerald-500' : 'hover:text-emerald-500 text-white'}`}>
                      {item.icon} {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
