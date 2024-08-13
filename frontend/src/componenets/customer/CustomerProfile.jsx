import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ProfileSideBar from "./ProfileSideBar"; // Import the ProfileSidebar component
import Header from "./profileHeader";
import Footer from "./profileFooter";

function CustomerProfile() {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState({
    fullName: "",
    contactNumber: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8500/user/get/${id}`
        );
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
        console.log("Data fetching error");
      }
    };
    fetchCustomerData();
  }, [id]);

  return (
    <>
      {/* Include Header component */}
      <Header />
      {/* Include ProfileSidebar component */}
      <ProfileSideBar />
      <div className="container mt-5">
        {/* User details card */}
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card">
              <div className="card-header" style={{ fontSize: "28px" }}>
                Hello {customerData.fullName}
              </div>
              <div className="card-body">
                <p className="card-text">
                  <strong>Full Name:</strong> {customerData.fullName}
                </p>
                <p className="card-text">
                  <strong>Contact Number:</strong> {customerData.contactNumber}
                </p>
                <p className="card-text">
                  <strong>Username:</strong> {customerData.username}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {customerData.email}
                </p>
                {/* Edit button inside the card */}
                <div className="text-right">
                  <Link
                    to={`/user/update-customerProfile/${id}`}
                    className="btn btn-primary mr-2"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3">
            {/* View Recently Added Items button */}
            <div className="text-right">
              <Link
                to={`/apparelavenue/RecentlyAddedItems`} // Change this to the appropriate route
                className="btn btn-primary"
              >
                View Recently Added Items
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Include Footer component */}
      <Footer />
    </>
  );
}

export default CustomerProfile;
