import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import { uploadImage } from '../utils/upload'
import { FiDownload } from "react-icons/fi";


const AddMovie = () => {

  const navigate = useNavigate()
  const [values, setValues] = useState({
    title: "",
    year: "",
    image: null
  });

  const [errors, setErrors] = useState({
    title: "",
    year: "",
    image: ""
  });

  const { addMovie } = useUserData();

  const validateForm = () => {
    const { title, year, image } = values;
    let isValid = true;

    if (!title) {
      setErrors(prevErrors => ({ ...prevErrors, title: "Title is required" }));
      isValid = false;
    }

    if (!year) {
      setErrors(prevErrors => ({ ...prevErrors, year: "Publishing year is required" }));
      isValid = false;
    } else if (!/^\d{4}$/.test(year)) {
      setErrors(prevErrors => ({ ...prevErrors, year: "Publishing year must be a valid 4-digit year" }));
      isValid = false;
    }

    if (!image) {
      setErrors(prevErrors => ({ ...prevErrors, image: "Movie image is required" }));
      isValid = false;
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setValues({ ...values, image: files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let imageURL = "";
      if (values.image) {
        imageURL = await uploadImage(values.image);  // Upload image to Cloudinary
      }

      const movie = {
        movie_name: values.title,
        movie_year: values.year,
        image: imageURL
      };

      await addMovie(movie, navigate);
      setValues({ title: "", year: "", image: null });  // Reset form values
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-5">Create a new movie</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="image-upload">
            <input
              type="file"
              id="imageUpload"
              name="image"
              onChange={handleChange} 
              className="form-control file-input"
              style={{ display: 'none' }}
            />
            <label htmlFor="imageUpload" className="image-drop-area">
            <FiDownload />

              <p>Drop an image here</p>
            </label>
            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
          </div>
        </div>

        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                className={`form-control ${errors.title && "is-invalid"}`}
                placeholder="Title"
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="form-group mb-5">
              <input
                type="text"
                id="year"
                name="year"
                onChange={handleChange}
                className={`form-control ${errors.year && "is-invalid"}publish_year`}
                placeholder="Publishing year"
              />
              {errors.year && <div className="invalid-feedback">{errors.year}</div>}
            </div>
            <div className="form-actions">
              <Link to="/" className="btn btn-outline_primary btn-block w-49">Cancel</Link>
              <button type="submit" className="btn btn_primary w-49">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
