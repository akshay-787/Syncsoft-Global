import React, { useEffect } from 'react'
import { BrowserRouter, Outlet } from 'react-router-dom'
import Header from './pages/Header'
import Footer from './pages/Footer';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); 
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (

    <div className="d-flex flex-column justify-content-between min-h-100vh">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App

