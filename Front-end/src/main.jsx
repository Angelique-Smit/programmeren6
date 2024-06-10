import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

// routes
import Read from './routes/read.jsx';
import Create from './routes/create.jsx';
import Detail from './routes/detail.jsx';
import Update from './routes/update.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Read />,
    },
    {
        path: '/create',
        element: <Create />,
    },
    {
        path: '/detail/:id',
        element: <Detail />,
    },
    {
        path: '/update/:id',
        element: <Update />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
);
