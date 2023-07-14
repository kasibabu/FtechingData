import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductDetailsPage from "./ProductDetailsPage";
import "./index.css";

const CartPage = ({ cart }) => {
  return (
    <div className="cart">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-item">
          {cart.length > 0 &&
            cart.map((product, index) => (
              <div key={index}>
                <h3>{product.title}</h3>
                {product.price && <p>Price: ${product.price}</p>}
                <img src={product.image} alt={product.title} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
const App = () => {
  const [cart, setCart] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const addToCart = (product) => {
    console.log(product);
    setCart([...cart, product]);
  };
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/carts/2");
        const data = await response.json();
        console.log(data.products);
        setCart(data.products);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const promises = cart.map(async (product) => {
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/${product.productId}`
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      });

      const productDetails = await Promise.all(promises);
      setProductDetails(productDetails);
    };

    fetchProductDetails();
  }, [cart]);
  console.log(productDetails);
  return (
    
    <Router>
      <div>
        <div className="header">
          <Link to="/">
            <h1>Products</h1>
          </Link>
          <Link to="/cart">
            <button>Go to Cart </button>
          </Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={productDetails.length === 0 ? (
              <p>Loading...</p>
            ) : (
              <div className="product-grid">
                {productDetails.map(
                  (product, index) => product && (
                    <div className="product-card" key={index}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-image" />
                      <div className="product-info">
                        <Link
                          to={`/product/${product.id}`}
                          className="product-link"
                        >
                          <h3 className="product-title">{product.title}</h3>
                          <p className="product-price">
                            Price: ${product.price}
                          </p>
                          <p className="product-price">
                            Rating Count: {product.rating.count}
                          </p>
                          <p className="product-price">
                            Rating: {product.rating.rate}
                          </p>
                        </Link>
                        <button
                          onClick={() => addToCart(product)}
                          className="product-button"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )} />
          <Route
            path="/product/:id"
            element={<ProductDetailsPage addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
