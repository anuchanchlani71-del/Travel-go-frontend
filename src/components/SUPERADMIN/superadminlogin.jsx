import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function SuperAdminLogin() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [rememberMe, setRememberMe] = useState(false);
const [errors, setErrors] = useState({});

const navigate = useNavigate();

const validateForm = () => {


const newErrors = {};

if (!email.trim()) {
  newErrors.email = "Email is required";
}

if (!password.trim()) {
  newErrors.password = "Password is required";
}

setErrors(newErrors);

return Object.keys(newErrors).length === 0;


};

const handleSubmit = async (e) => {


e.preventDefault();

if (!validateForm()) return;

try {

  const data = {
    email,
    password
  };

  const res = await axios.post(
    "http://localhost:5000/superadmin/login",
    data
  );

  if (res.data.success) {

    localStorage.setItem(
      "superadminToken",
      res.data.token
    );

    localStorage.setItem(
      "superadminId",
      res.data.data._id
    );

    localStorage.setItem(
      "superadminRole",
      res.data.data.role
    );

    toast.success(
      "Login Successfully"
    );

    navigate(
      "/superadmin/dashboard",
      { replace: true }
    );

  } else {

    toast.error(
      res.data.message
    );

  }

} catch (error) {

  toast.error(
    error.response?.data?.message ||
    "Something went wrong"
  );

}


};

return ( <div className="login-box">


  <Toaster />

  <div className="card card-outline card-primary">

    <div className="card-header text-center">
      <h2>
        <b>TRAVEL GO</b>
      </h2>
      <p className="mb-0">
        Super Admin Panel
      </p>
    </div>

    <div className="card-body">

      <p className="login-box-msg">
        Sign in to continue
      </p>

      <form onSubmit={handleSubmit}>

        <div className="input-group mb-3">

          <input
            type="email"
            className={`form-control ${
              errors.email
                ? "is-invalid"
                : ""
            }`}
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
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
              errors.password
                ? "is-invalid"
                : ""
            }`}
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
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

        <div className="row">

          <div className="col-8">

            <div className="icheck-primary">

              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(
                    !rememberMe
                  )
                }
              />

              <label htmlFor="remember">
                Remember Me
              </label>

            </div>

          </div>

          <div className="col-4">

            <button
              type="submit"
              className="btn btn-primary btn-block"
            >
              Sign In
            </button>

          </div>

        </div>

      </form>

    </div>

  </div>

</div>

);
}

export default SuperAdminLogin;
