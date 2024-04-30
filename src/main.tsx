import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './pages/ErrorPage';
import Register from './pages/Register';
import DoctorDetails from './pages/DoctorDetails';
import ListDoctors from './pages/ListDoctors';
import Index from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: '/*',
        element: <ErrorPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'cadastro',
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'cadastro/:cpf', // Use um parâmetro dinâmico para o CPF do médico
        element: <DoctorDetails />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'lista-de-medicos', // Use um parâmetro dinâmico para o CPF do médico
        element: <ListDoctors />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
