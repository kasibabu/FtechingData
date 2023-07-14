import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailsPage.css";
const ProductDetailsPage = ({ addToCart }) => {
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();
  const handleAddToCart = () => {
    addToCart(productDetails);
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails(productDetails);
  }, [id]);
  return (
    <div className="product-details-container">
      <h1>Product Details</h1>
      {productDetails ? (
        <div className="product-details">
          <h3 className="product-title">
            {productDetails.title && productDetails.title}
          </h3>
          <p className="product-price">
            Price: ${productDetails.price && productDetails.price}
          </p>
          <img
            src={productDetails.image}
            alt={productDetails.title}
            className="product-image"
          />
          <p className="product-description">
            {productDetails.description && productDetails.description}
          </p>
          <button onClick={() => handleAddToCart(productDetails)} className="product-button">
            Add to Cart
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
