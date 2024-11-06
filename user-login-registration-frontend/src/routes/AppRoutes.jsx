import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './UserRoutes'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<UserRoutes></UserRoutes>}></Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
