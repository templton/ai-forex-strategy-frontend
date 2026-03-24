import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@containers/layout/MainLayout/MainLayout';
import Hello from '@containers/page/Hello/Hello';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/hello' replace />,
      },
      {
        path: 'hello',
        element: <Hello />,
      },
    ],
  },
]);
