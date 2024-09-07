import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Navbar";

const NotFoundPage = () => {
  return (
    <div
      className="project-page-container "
      style={{ backgroundImage: "url(/food.jpg)"}}
    >
      <Header />
      <div className="d-flex justify-content-center align-items-center m-5" >
      <div className="not-found-card">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="btn text-white mt-3">
          Go Back Home
        </Link>
      </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
