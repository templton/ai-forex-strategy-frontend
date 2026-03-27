import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@containers/layout/MainLayout/MainLayout';
import Hello from '@containers/page/Hello/Hello';
import StrategyCreate from '@containers/page/StrategyCreate/StrategyCreate';
import StrategyEdit from '@containers/page/StrategyEdit/StrategyEdit';
import StrategyView from '@containers/page/StrategyView/StrategyView';
import StrategyList from '@containers/page/StrategyList/StrategyList';

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
      {
        path: 'strategies',
        element: <StrategyList />,
      },
      {
        path: 'strategies/create',
        element: <StrategyCreate />,
      },
      {
        path: 'strategies/edit/:id',
        element: <StrategyEdit />,
      },
      {
        path: 'strategies/view/:id',
        element: <StrategyView />,
      },
    ],
  },
]);
