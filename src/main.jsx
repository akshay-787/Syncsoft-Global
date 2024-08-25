import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import MovieList from './pages/MovieList.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';
import { ToastContainer, toast } from 'react-toastify';
import AddMovie from './pages/AddMovie.jsx';
import EditMovies from './pages/EditMovies.jsx'
import { UserDataProvider } from './context/UserDataContext.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <PrivateRoute element={MovieList} />,
      },
      {
        path: '/add',
        element: <PrivateRoute element={AddMovie} />,
      },
      {
        path: '/edit/:id',
        element: <PrivateRoute element={EditMovies} />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserDataProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UserDataProvider>
    </AuthProvider>
  </StrictMode>
);

