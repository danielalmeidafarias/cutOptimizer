import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CutPage from './routes/CutPage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import CutLists from './routes/CutLists.jsx'
import { LoginProvider } from './context/LoginContext.jsx'


const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/',
    element: <CutPage />
  },
  {
    path: '/listas',
    element: <CutLists />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <LoginProvider>
    <RouterProvider router={router}/>
  </LoginProvider>
  // </React.StrictMode>,
)
