import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../presentation/components/layout';
import { HomePage, CategoryPage, ProfilePage, TravelAroundPage } from '../presentation/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'travel-around',
        element: <TravelAroundPage />,
      },
      {
        path: 'stays',
        element: <CategoryPage />,
      },
      {
        path: 'transportation',
        element: <CategoryPage />,
      },
      {
        path: 'tours-activities',
        element: <CategoryPage />,
      },
      {
        path: 'eat-drink',
        element: <CategoryPage />,
      },
      {
        path: 'flights',
        element: <CategoryPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
]);
