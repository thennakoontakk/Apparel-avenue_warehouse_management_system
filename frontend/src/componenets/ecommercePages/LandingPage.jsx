import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function LandingPage() {
  return (
    <div>
      <Header />
      <section
        className="description-section text-white py-5"
        style={{ backgroundColor: "#1E90FF" }}
      >
        {" "}
        {/* Apply inline style for background color */}
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-4 mb-4">
                Discover Your Style with Apparel Avenue
              </h2>
              <p className="lead">
                "Welcome to APPAREL AVENUE, your one-stop wholesale clothing
                destination! Explore our curated collection of stylish and
                high-quality apparel, perfect for retailers looking to elevate
                their inventory. With competitive pricing and exceptional
                service, we're here to help you succeed. Start shopping now and
                experience the difference with APPAREL AVENUE!"
              </p>
              <p>
                Sign up now to receive exclusive offers and updates on our
                newest arrivals.
              </p>
              <a
                href="/user/register-customer"
                className="btn btn-primary btn-lg"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        {/* Featured Products Section */}
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <img
                src="featured-product-1.jpg"
                className="card-img-top"
                alt="Featured Product 1"
              />
              <div className="card-body">
                <h3 className="card-title">Featured Product 1</h3>
                <p className="card-text">Description of the product</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <img
                src="featured-product-2.jpg"
                className="card-img-top"
                alt="Featured Product 2"
              />
              <div className="card-body">
                <h3 className="card-title">Featured Product 2</h3>
                <p className="card-text">Description of the product</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <img
                src="featured-product-2.jpg"
                className="card-img-top"
                alt="Featured Product 2"
              />
              <div className="card-body">
                <h3 className="card-title">Featured Product 2</h3>
                <p className="card-text">Description of the product</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
          {/* Add more featured products as needed */}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default LandingPage;
