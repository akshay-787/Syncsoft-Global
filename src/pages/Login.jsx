import React, { useContext,useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const {login} = useAuth()
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const validateForm = () => {
        const { email, password } = values;
        let isValid = true;

        if (!email) {
            setErrors(prevErrors => ({ ...prevErrors, email: "Email is required" }));
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors(prevErrors => ({ ...prevErrors, email: "Email is not valid" }));
            isValid = false;
        }

        if (!password) {
            setErrors(prevErrors => ({ ...prevErrors, password: "Password is required" }));
            isValid = false;
        }else if(password.length < 6){
            setErrors(prevErrors => ({ ...prevErrors, password: "Password must be 6 character long" }));
            isValid = false;
        }

        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        
        const { email, password } = values;
        login(email,password,navigate)
    }
    return (
        <div className="container">
          <div className="sign_in_box">
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <input
                  type="email"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  id="email"
                  onChange={handleChange}
                  placeholder="Email"
                  name="email"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  id="password"
                  onChange={handleChange}
                  placeholder="Password"
                  name="password"
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="form-check mb-3">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                </label>
              </div>
              <div className="d-grid gap-3">
                <button type="submit" className="btn btn_primary btn-block">Login</button>
              </div>
            </form>
          </div>
        </div>
      );
    };
    
    export default Login;