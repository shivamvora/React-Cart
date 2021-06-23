import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../pages/CartContext";

const Product = (props) => {
  const [isAdding, setIsAdding] = useState(false);

  const { cart, setCart } = useContext(CartContext);
  const { product } = props;

  const addToCart = (event, product) => {
    event.preventDefault();
    let _cart = { ...cart };

    if (!_cart.items) {
      _cart.items = {};
    }
    if (_cart.items[product._id]) {
      _cart.items[product._id] += 1;
    } else {
      _cart.items[product._id] = 1;
    }

    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }

    _cart.totalItems += 1;
    setCart(_cart);
  };

  return (
    <Link to={`/products/${product._id}`}>
      <div>
        <div>
          <img src="/images/pepproni-pizza.png" alt="pepproni" />
          <div className="text-center">
            <h2 className="text-lg font-bold py-2">{product.name}</h2>
            <span className="bg-gray-200 py-1 rounded-full text-sm px-4">
              {product.size}
            </span>
          </div>
          <div className="flex justify-between mt-4 items-center">
            <span>₹ {product.price}</span>
            <button
              style={{ outline: "none" }}
              className="bg-yellow-500 py-1 px-4 rounded-full font-bold "
              onClick={(e) => {
                addToCart(e, product);
              }}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
