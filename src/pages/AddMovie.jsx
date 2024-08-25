import React from 'react';
import { useUserData } from '../context/UserDataContext';
import MovieForm from '../components/MovieForm';

const AddMovie = () => {
  const { addMovie } = useUserData();

  const initialValues = { title: "", year: "", image: null };

  return (
    <MovieForm
      initialValues={initialValues}
      onSubmit={addMovie}
      submitButtonLabel="Add"
    />
  );
};

export default AddMovie;
