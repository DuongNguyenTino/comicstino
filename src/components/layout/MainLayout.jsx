import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className='overflow-hidden min-h-screen'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
