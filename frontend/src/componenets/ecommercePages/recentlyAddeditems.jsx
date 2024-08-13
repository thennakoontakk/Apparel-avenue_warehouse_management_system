import React, { useState, useEffect } from "react";
import axios from "axios";

function RecentlyAddedItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRecentlyAddedItems = async () => {
      try {
        const response = await axios.get("/item/recently-added");
        setItems(response.data); // Assuming the response.data is an array of item objects
      } catch (error) {
        console.error("Error fetching recently added items:", error);
      }
    };
    fetchRecentlyAddedItems();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Recently Added Items</h1>
      <div className="row">
        {items.map((item) => (
          <div key={item._id} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src={item.image} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">Price: ${item.price}</p>
                <button className="btn btn-primary">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyAddedItems;
