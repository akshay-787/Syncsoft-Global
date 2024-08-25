import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {API_URL} from '../utils/constant'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  const [userData,setUserData] = useState('')
  
  useEffect(() => {
    const email = localStorage.getItem('email');
    if(email){
      setIsAuthenticated(true)
      setUserData(email)
    }
  }, []);

  const login = async (email, password,navigate) => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      const users = response.data;
      const user = users.find(user => user.email === email);
      
      if (user && user.password === password) {
        setIsAuthenticated(true);
        setUserData(user.email)
        localStorage.setItem('email', user.email);
        toast.success('Logged In Successfully');
        navigate('/');
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const logout = (navigate) => {    
    setIsAuthenticated(false);
    localStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated, userData,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
