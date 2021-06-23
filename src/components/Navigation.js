import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../pages/CartContext";

const Navigation = () => {
  const cartStyle = {
    background: "#D59E0D",
    display: "flex",
    padding: "6px 12px",
    borderRadius: "50px",
  };
  const { cart } = useContext(CartContext);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link to="/">
          <img style={{ height: 60 }} src="/images/logo.png" alt="logo" />
        </Link>
        <ul className="flex itmes-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="ml-6">
            <Link to="/Products">Products</Link>
          </li>
          <li className="ml-6">
            <Link to="/cart">
              <div style={cartStyle}>
                <span className="text-white">{cart.totalItems ? cart.totalItems:0}</span>

                <img
                  className="ml-2"
                  style={{ height: 30 }}
                  src="/images/cart.png"
                  alt="cart"
                />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
