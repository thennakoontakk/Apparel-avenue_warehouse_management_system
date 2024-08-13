import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./styles.css";
import Sidebar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

//import toast
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DiscountList() {
  const [discounts, setDiscounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get("http://localhost:8500/discount/");
        setDiscounts(response.data);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data.error : error.message
        );
      }
    };
    fetchDiscounts();
  }, []);

  const handleEdit = (_id) => {
    navigate(`/discount/update/${_id}`); // Navigate to edit page
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8500/discount/delete/${_id}`);
      setDiscounts(discounts.filter((discount) => discount._id !== _id));
      console.log("Discount deleted successfully!");
      toast.success("Discount deleted successfully!");
      alert("Discount deleted successfully!");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.error : error.message
      );
      toast.error("Failed to delete discount");
    }
  };

  const handleClickNewDiscount = () => {
    // Navigate to the desired page when the button is clicked
    navigate("/discount/add");
  };

  const handleClickBackHome = () => {
    // Navigate to the desired page when the button is clicked
    navigate("/OrderHome");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDiscounts = discounts.filter((discount) =>
    Object.values(discount).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-auto">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2 className="text-center">Discounts List</h2>
          <div className="search-container">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="btn btn-secondary me-2"
              type="button"
              onClick={handleClickNewDiscount}
            >
              <FontAwesomeIcon icon={faPlus} /> Add new Discount
            </button>
          </div>
          <table id="discount-table" className="table table-striped">
            <thead>
              <tr>
                <th>Discount Code</th>
                <th>Expiry Date</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {filteredDiscounts.map((discount) => (
                <tr key={discount.Id}>
                  <td>{discount.code}</td>
                  <td>{discount.expiry}</td>
                  <td>{discount.percentage}</td>

                  <td>
                    <button
                      className="btn btn-success me-1 action-button"
                      onClick={() => handleEdit(discount._id)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className="btn btn-danger action-button"
                      onClick={() => handleDelete(discount._id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-primary float-end"
            onClick={handleClickBackHome}
          >
            Back to Home
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DiscountList;
