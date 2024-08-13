import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8500/product/get/${id}`
        );
        setProduct(response.data);
        if (
          response.data &&
          response.data.color &&
          response.data.color.length > 0
        ) {
          setSelectedColor(response.data.color[0]);
        }
        if (
          response.data &&
          response.data.size &&
          response.data.size.length > 0
        ) {
          setSelectedSize(response.data.size[0]); // Set default selected size
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const response = await axios.post("http://localhost:8500/cart/", {
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize,
      });
      console.log("Product added to cart:", response.data);

      navigate(`/cart/cart`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 1) {
      setQuantity(parseInt(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addToCart();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {product ? (
          <div>
            <h1>{product.name}</h1>
            <p>Description: {product.description}</p>
            <h4>Price: ${product.price}</h4>
            {product.color && product.color.length > 0 && (
              <div className="dropdown">
                <label> Color: </label>&nbsp;
                <select
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                >
                  {product.color.map((color) => (
                    <option className="dropdown-item" key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <br></br>
            {product.size && product.size.length > 0 && (
              <div className="dropdown">
                <label> Size:</label>&nbsp;
                <select
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  value={selectedSize}
                  onChange={(e) => handleSizeChange(e.target.value)}
                >
                  {product.size.map((size) => (
                    <option className="dropdown-item" key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <br></br>
            <div className="input-group mb-3">
              <label>Quantity:</label>&nbsp;
              <input
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
              />
            </div>
            <br></br>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-primary me-md-2"
                disabled={!selectedColor || !selectedSize || quantity < 1}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </form>
    </div>
  );
};

export default ProductDetail;
