import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/authSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      className="site-navbar "
      role="banner"
      style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
    >
      <div className="container">
        <div className="row align-items-center position-relative">
          <div className="site-logo">
            <Link
              to="/"
              className="text-black"
              style={{ textDecoration: "none" }}
            >
              <span className="text-dark-gray">Navya</span>
            </Link>
          </div>

          {userInfo && (
            <div className="ml-auto">
              <button
                onClick={handleLogout}
                className="btn  text-black font-weight-bold"
                style={{ color: 'gray', fontWeight: 'bold', float: 'right' }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
