import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  console.log(params);

  useEffect(() => {
    fetch(`https://ecom-rest-apis.herokuapp.com/api/products/${params._id}`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
        console.log(product);
      });
  }, [params._id]);

  return (
    <div className="container mx-auto mt-12">
      <Link to="/">
        <button
          style={{ outline: "none" }}
          className="mb-12 font-bold bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4 text-white"
        >
          Back
        </button>
      </Link>
      <div className="flex">
        <img
          width="400"
          height="400"
          src="/images/pizza.jpg"
          alt="details page"
        />
        <div className="mt-16">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-xl">{product.size}</div>
          <div className="font-bold mt-2 text-md">₹ {product.price}</div>
          <button
            style={{ outline: "none" }}
            className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4 text-white"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
