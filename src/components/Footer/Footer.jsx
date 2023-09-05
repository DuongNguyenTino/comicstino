import React from 'react'
import { BsFacebook, BsGithub, BsInstagram } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className='bg-zinc-900'>
      <div className='max-w-7xl px-4 py-12 mx-auto space-y-8 overflow-hidden'>
        <div className='flex justify-center mt-8 space-x-6'>
          <a href='https://www.facebook.com/profile.php?id=100033986333586' rel='noreferrer' target='_blank'
            className='text-gray-300 hover:text-gray-400'
          >
            <BsFacebook size={30} />
          </a>
          <a href='https://github.com/DuongNguyenTino' rel='noreferrer' target='_blank'
            className='text-gray-300 hover:text-gray-400'
          >
            <BsGithub size={30} />
          </a>
          <a href='https://www.instagram.com/duongnguyenvan506' rel='noreferrer' target='_blank'
            className='text-gray-300 hover:text-gray-400'
          >
            <BsInstagram size={30} />
          </a>
        </div>
        <p className='mt-8 text-base leading-6 text-center text-gray-300'> © 2023 ComicsTino. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
