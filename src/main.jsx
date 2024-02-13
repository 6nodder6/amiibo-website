import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import {
    Root,
    ErrorPage,
    Home,
    Owned
} from './Routes'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Root><ErrorPage /></Root>,
        children: [
            { index: true, element: <Home /> },
            {
                path: '/owned',
                element: <Owned />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
