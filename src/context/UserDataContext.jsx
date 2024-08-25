
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import {API_URL} from '../utils/constant'

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  
  const [movies, setMovies] = useState([]);
  const { isAuthenticated, userData } = useAuth();

  useEffect(() => {
    fetchMovies();
  }, [isAuthenticated, userData]);

  const fetchMovies = async () => {
    try {
      if (isAuthenticated && userData) {
        const response = await axios.get(`${API_URL}/users?email=${userData}`);
        setMovies(response.data[0].movies);
      }
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };

  const addMovie = async (movie, navigate) => {
    try {
      if (userData) {
        const userResponse = await axios.get(`${API_URL}/users?email=${userData}`);
        const user = userResponse.data[0];
  
        if (user) {
          const dateNow = new Date();
          const movieWithDateId = {
            id: dateNow.toISOString(),
            ...movie,
          };
  
          const updatedMovies = [...user.movies, movieWithDateId];
  
          await axios.put(`${API_URL}/users/${user.id}`, { ...user, movies: updatedMovies });
  
          setMovies(updatedMovies);
          toast.success('Movie Added Successfully');
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Error adding movie:", error.message);
    }
  };

  const updateMovie = async (id, updatedMovie, navigate) => {
    try {
      const response = await axios.get(`${API_URL}/users?email=${userData}`);
      const user = response.data[0];
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const movieIndex = user.movies.findIndex(movie => movie.id === id);
  
      if (movieIndex === -1) throw new Error('Movie not found');
  
      const movieToUpdate = {
        ...updatedMovie,
        id: user.movies[movieIndex].id,
      };
  
      user.movies[movieIndex] = movieToUpdate;
  
      await axios.put(`${API_URL}/users/${user.id}`, user);
      toast.success('Updated Successfully');
  
      fetchMovies();
    } catch (error) {
      console.error("Error updating movie:", error.message);
    }
  };

  return (
    <UserDataContext.Provider value={{ movies, addMovie, updateMovie }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
