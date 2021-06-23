import React from "react";
import Products from "../components/Products";
import { Link } from "react-router-dom";
const ProductsPage = () => {
  return (
    <>
      <div>
        <div className="ml-24">
          <Link to="/">
            <button
              style={{ outline: "none" }}
              className="mb-12 font-bold bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4 text-white"
            >
              Back
            </button>
          </Link>
        </div>

        <Products />
      </div>
    </>
  );
};

export default ProductsPage;
