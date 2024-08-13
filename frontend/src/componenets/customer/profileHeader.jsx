import React from "react";

function Header() {
  return (
    <header className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="/">
          Apparel Avenue
        </a>
        <form className="form-inline d-flex">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-primary my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        {/* <a href="/user/login-customer" className="btn btn-primary">
          Login
        </a> */}
      </div>
    </header>
  );
}

export default Header;
