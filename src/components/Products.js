import React, { useState, useEffect, useContext } from "react";
import Product from "./Product";
import { CartContext } from "../pages/CartContext";

const Products = () => {
  const [products, setProducts] = useState(["Shivam", "Mitul"]);
  //   https://ecom-rest-apis.herokuapp.com/api/products
  useEffect(() => {
    fetch("https://ecom-rest-apis.herokuapp.com/api/products")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((products) => {
        setProducts(products);
        console.log(products);
      });
  }, []);

  return (
    <div className="container mx-auto pb-24">
      <h1 className="text-lg font-bold my-8">Products </h1>
      <div className="grid grid-cols-5 my-8 gap-24">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
