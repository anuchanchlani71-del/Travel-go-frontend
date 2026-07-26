import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import Http from '../../services/Http';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function useAdminLogin() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [rememberMe, setRememberMe] = useState(false);
const [errors, setErrors] = useState({});
const navigate = useNavigate();


const validateForm = () => {
const newErrors = {};

// Validate email
if (!email.trim()) {
newErrors.email = 'Email is required';
}

// Validate password
if (!password.trim()) {
newErrors.password = 'Password is required';
}

setErrors(newErrors);

// Return true if there are no errors
return Object.keys(newErrors).length === 0;
};


const handleSubmit = async (e) => {
e.preventDefault();
if (validateForm()) {
    const data = {
        email:email,
        password:password
    }
    // const services = new Service();
    const res = await axios.post('http://localhost:5000/api/company/login',data);
    if (res.data.success) {
        const token = res.data.token;
        localStorage.setItem('adminToken', token);
        localStorage.setItem("sellerId", res.data.data._id)
        localStorage.setItem(
  "businessType",
  res.data.data.businessType
);
        
        navigate('/admin/dashboard',{ replace: true });
      } else {
        toast.error(res.data.message);
      }

} else {
// Form is invalid, display errors
console.log('Form validation failed');

}
}

return (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{
      minHeight: "100vh",
      background: "#f4f6f9",
    }}
  >
    <Toaster />

    <div
      className="card shadow-lg"
      style={{
        width: "420px",
        borderRadius: "12px",
        borderTop: "4px solid #007bff",
      }}
    >
      <div
        className="card-header text-center"
        style={{
          background: "#007bff",
          color: "#fff",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <h2 className="mb-0 font-weight-bold">
          <i className="fas fa-user-shield mr-2"></i>
          TRAVEL GO
        </h2>

        <small>Admin Login</small>
      </div>

      <div className="card-body p-4">

        <p className="text-center text-muted mb-4">
          Sign in to start your session
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group mb-3">
            <input
              type="text"
              className={`form-control ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope"></span>
              </div>
            </div>

            {errors.email && (
              <div className="invalid-feedback">
                {errors.email}
              </div>
            )}
          </div>

          <div className="input-group mb-3">
            <input
              type="password"
              className={`form-control ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock"></span>
              </div>
            </div>

            {errors.password && (
              <div className="invalid-feedback">
                {errors.password}
              </div>
            )}
          </div>

          {errors.message && (
            <div
              className="alert alert-danger py-2"
            >
              {errors.message}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-3">

            <div className="icheck-primary">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(!rememberMe)
                }
              />
              <label htmlFor="remember">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary px-4"
            >
              Log in
            </button>

          </div>

        </form>

        <hr />

        <div className="text-center">

          <p className="mb-2">
            <a href="#">Forgot Password?</a>
          </p>

          <Link
            to="/admin/register"
            className="btn btn-outline-primary btn-sm"
          >
            Sign in
          </Link>

        </div>

      </div>
    </div>
  </div>
);
}
export default useAdminLogin;