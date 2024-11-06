import React from 'react'
import Header from '../component/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../component/footer/Footer'

const UserLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header></Header>
        <div className='flex-grow'>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      
    </div>
  )
}

export default UserLayout
