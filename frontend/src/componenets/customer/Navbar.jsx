import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom fixed-top">
      <a className="navbar-brand" href="/">
        Brand Name
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Categories">
              Categories
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/About">
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/New">
              New
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="ml-2">
          <button className="btn btn-outline-primary">Login</button>
        </div>
        <div className="ml-2">
          <button className="btn btn-outline-primary">Signup</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
