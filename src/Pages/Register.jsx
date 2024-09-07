import React, { useState, useEffect } from "react";
import {
  useRegisterUserMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useGenerateQRCodeQuery,
} from "../Store/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Components/Navbar";

const Register = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    form: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [registerUser] = useRegisterUserMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const navigate = useNavigate();
  const [resendOtpMutation] = useResendOtpMutation();
  const [useQR, setUseQR] = useState(false);

  const {
    data: qrData,
    error: qrError,
    isLoading: qrLoading,
  } = useGenerateQRCodeQuery();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name) => {
    if (!name.trim()) {
      return false;
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      form: "",
      phoneNumber: "",
    };
    let isValid = true;

    if (!name.trim() || !validateName(name)) {
      newErrors.name = "Name should contain only letters";
      isValid = false;
    }
    if (!phoneNumber.trim() || !validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      isValid = false;
    }
    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }

    if (!password.trim() || !validatePassword(password)) {
      newErrors.password =
        "Password must be strong (6+ characters with uppercase, lowercase, digits, and special characters)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "Please enter the 4-digit OTP",
      }));
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyOtp({ email, otp: otpCode });
      console.log(response);
      if ("error" in response) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          form:
            response.error.data?.error ||
            "OTP verification failed. Please try again.",
        }));
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "OTP verification failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await registerUser({ name, email, password });
      console.log(response);
      if ("error" in response) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          form:
            response.error.data?.error ||
            "Registration failed. Please try again.",
        }));
        return;
      }

      setIsOtpSent(true);
      setTimer(30);
    } catch (error) {
      console.error("Failed to register:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "Registration failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0 && isOtpSent) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer, isOtpSent]);

  const resendOtp = async () => {
    try {
      const response = await resendOtpMutation({ email });
      if ("error" in response) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          form:
            response.error.data?.error ||
            "Failed to resend OTP. Please try again.",
        }));
        return;
      }
      setTimer(30);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "Failed to resend OTP. Please try again.",
      }));
    }
  };

  return (
    <>
      <section
        className="text-center position-relative"
        style={{
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Header />
        <div
          style={{
            backgroundImage: "url(/restaurant2.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        ></div>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            minHeight: "100vh",
            position: "relative",
            zIndex: 3,
          }}
        >
          <div
            className="card mx-2 mx-md-3 shadow-5-strong bg-body-tertiary bg-transparent"
            style={{
              backdropFilter: "blur(30px)",
              display: "flex",
              flexDirection: "row",
              borderRadius: "15px",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            <div
              className="card-image"
              style={{
                flex: 1,
                backgroundImage: "url(/food3.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                height: "560px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>

            <div
              className="card-body"
              style={{
                flex: 1,
                padding: "2rem",
              }}
            >
              <h2 className="fw-bold mb-5">Register</h2>
              <div className="d-flex justify-content-between mb-4">
                <button
                  className={`btn ${
                    useQR ? "btn-light" : "btn-outline-light"
                  } w-50 me-2`}
                  onClick={() => setUseQR(false)}
                >
                  Register via Form
                </button>
                <button
                  className={`btn ${
                    useQR ? "btn-outline-light" : "btn-light"
                  } w-50`}
                  onClick={() => setUseQR(true)}
                >
                  Register via WhatsApp
                </button>
              </div>

              {!useQR ? (
                !isOtpSent ? (
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label className="form-label">Name</label>
                      {errors.name && (
                        <small className="text-danger">{errors.name}</small>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label">Email</label>
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>

                    <div className="form-outline mb-4 position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label">Password</label>
                      <i
                        className={`${
                          showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                        } position-absolute end-0 top-0 mt-3 me-3 cursor-pointer`}
                        onClick={togglePasswordVisibility}
                      ></i>
                      {errors.password && (
                        <small className="text-danger">{errors.password}</small>
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <label className="form-label">Phone Number</label>
                      {errors.phoneNumber && (
                        <small className="text-danger">
                          {errors.phoneNumber}
                        </small>
                      )}
                    </div>

                    {errors.form && (
                      <div className="text-danger text-center mb-3">
                        {errors.form}
                      </div>
                    )}

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <h5 className="mb-4">Enter the OTP sent to your email</h5>
                    <form onSubmit={handleOtpSubmit}>
                      <div className="d-flex justify-content-between mb-4">
                        {[0, 1, 2, 3].map((index) => (
                          <input
                            key={index}
                            type="text"
                            id={`otp-${index}`}
                            className="form-control text-center mx-1"
                            maxLength="1"
                            value={otp[index]}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                          />
                        ))}
                      </div>
                      {errors.form && (
                        <div className="text-danger text-center mb-3">
                          {errors.form}
                        </div>
                      )}
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isLoading}
                        >
                          Verify OTP
                        </button>
                      </div>
                    </form>
                    <div className="mt-4">
                      {timer > 0 ? (
                        <p>
                          Resend OTP in <strong>{timer}</strong> seconds
                        </p>
                      ) : (
                        <button
                          className="btn btn-link"
                          onClick={resendOtp}
                          disabled={isLoading}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center">
                  {qrLoading ? (
                    <p>Loading QR code...</p>
                  ) : qrError ? (
                    <p>Error loading QR code.</p>
                  ) : (
                    <>
                      <img
                        src={qrData.qrCodeDataURL}
                        alt="QR Code"
                        className="img-fluid"
                        style={{ maxWidth: "200px" }}
                      />

                      <p className="mt-3">
                        Scan the QR code with WhatsApp to register.
                      </p>
                    </>
                  )}
                </div>
              )}
              <p className="mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
