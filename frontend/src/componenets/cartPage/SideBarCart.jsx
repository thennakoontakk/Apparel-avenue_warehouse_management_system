import React, { useState, useEffect } from "react";
import axios from "axios";

const SideBarCart = ({ discount = 0 }) => {
  const [carts, setCart] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const deliveryCharge = 210;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:8500/cart");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    if (carts) {
      const newSubtotal = carts.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setSubtotal(newSubtotal);
    }
  }, [carts]);

  const Discount = (subtotal * (discount / 100)).toFixed(2);
  const total = (subtotal + deliveryCharge - Discount).toFixed(2);

  return (
    <nav
      id="sidebar"
      className="bg-dark text-light vh-100 shadow"
      style={{ width: "350px", display: "flex", flexDirection: "column" }}
    >
      <div>
        <br></br>
        <h1>Cart Details</h1>
        <br></br>
        {carts && carts.length > 0 && (
          <div>
            {carts.map((item, index) => (
              <div key={index}>
                <p>Product Name: {item.productName}</p>
                <p>Price: ${item.price * item.quantity}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Color: {item.color}</p>
                <p>Size: {item.size}</p> {/* Displaying size */}
                <hr></hr>
              </div>
            ))}
            <div>
              <table>
                <tbody>
                  <tr className="fs-5">
                    <td>Subtotal:</td>
                    <td>${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr className="fs-5">
                    <td>Delivery Charge:</td>
                    <td>${deliveryCharge}</td>
                  </tr>
                  <tr className="fs-5">
                    <td>Discount:</td>
                    <td>${Discount}</td>
                  </tr>
                  <tr className="fs-5">
                    <td>Total:</td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SideBarCart;
