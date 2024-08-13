import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const CartPage = () => {
  const [carts, setCart] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

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

  const handleDeleteItem = async (_id) => {
    try {
      await axios.delete(`http://localhost:8500/cart/${_id}`);
      setCart(carts.filter((cart) => cart._id !== _id));
      console.log("Item deleted successfully!");
      alert("Item deleted successfully!");
      toast.success("Iten deleted successfully!");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.error : error.message
      );
    }
  };

  const handleQuantityChange = async (_id, newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:8500/cart/${_id}`, {
        quantity: newQuantity,
      });
      const updatedCart = carts.map((item) => {
        if (item._id === _id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCart(updatedCart);
      console.log("Quantity updated successfully!");
      navigate("/cart/cart");
    } catch (error) {
      console.error(
        "Error updating quantity:",
        error.response ? error.response.data.error : error.message
      );
    }
  };

  const handleCheckout = () => {
    console.log("Checkout clicked!");
    navigate(`/cart/checkout`);
  };

  return (
    <div className="container-fluid">
      <h1>Shopping Cart</h1>

      {carts && carts.length > 0 && (
        <table className="table">
          <tbody>
            {carts.map((item, index) => (
              <tr className="d-flex justify-content-around" key={index}>
                <td>
                  <h4>Product Name: {item.productName}</h4>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                  <h5>Price: ${item.price * item.quantity}</h5>
                  <p>Maximum quantity selected</p>
                  <label>Quantity : </label>&nbsp;
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  &nbsp;
                  <span>{item.quantity}</span>&nbsp;
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      handleQuantityChange(
                        item._id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  >
                    -
                  </button>
                </td>
                <td>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn btn-danger me-md-2"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            <tr className="d-flex justify-content-around">
              <td>
                <h5>Subtotal : </h5>
                <p>Delivery and discounts calculated at checkout </p>
              </td>
              <td>
                <h5 className="d-flex justify-content-end"> ${subtotal}</h5>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    className="btn btn-primary me-md-2"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
};

export default CartPage;
