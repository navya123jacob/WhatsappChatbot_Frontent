import React, { useEffect, useState } from 'react';
import { useLoginUserMutation } from '../Store/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../Store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Navbar';

const Login = () => {
 const userInfo = useSelector((state) => state.auth.userInfo);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 useEffect(()=>{
 if(userInfo){
    navigate('/')
 }
 },[userInfo,dispatch])
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = { email: '', password: '', form: '' };
    let isValid = true;

    if (!validateEmail(email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await loginUser({ email, password });
      if ('error' in response) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: response.error.data?.error || 'Login failed. Please try again.',
        }));
        return;
      }
      dispatch(setUserInfo(response.data));
      navigate('/');
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: 'Login failed. Please try again.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="text-center position-relative"
      style={{ minHeight: '100vh', overflow: 'hidden' }}
    >
      <Header/>
      <div
        style={{
          backgroundImage: 'url(/restaurant2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      ></div>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: '100vh',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div
          className="card mx-2 mx-md-3 shadow-5-strong bg-body-tertiary bg-transparent"
          style={{
            backdropFilter: 'blur(30px)',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '15px',
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <div
            className="card-image"
            style={{
              flex: 1,
              backgroundImage: 'url(/food2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
              borderTopLeftRadius: '15px',
              borderBottomLeftRadius: '15px',
              height: '450px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></div>

          <div
            className="card-body"
            style={{
              flex: 1,
              padding: '2rem',
            }}
          >
            <h2 className="fw-bold mb-5">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control custom-input"
                  placeholder="Email"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>

              <div className="form-outline mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control custom-input"
                  placeholder="Password"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="me-2"
                    onClick={togglePasswordVisibility}
                  />
                  <span className="text-white">Show Password</span>
                </div>
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-outline-light btn-lg px-5"
                style={{
                  width: '100%',
                  marginTop: '2rem',
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>

              {errors.form && (
                <div className="text-danger mt-3">{errors.form}</div>
              )}
              <div className="mt-3">
                    <span className="text-white">
                      Do not have an account?{" "}
                    </span>
                    <Link
                      to="/register"
                      className="text-decoration-underline"
                      style={{ color: "white" }}
                    >
                      Register
                    </Link>
                  </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
