import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
// import About from "./pages/About";
import Navigation from "./components/Navigation";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import ProductsPage from "./pages/ProductsPage";
import { CartContext } from "./pages/CartContext";

const App = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const cart = window.localStorage.getItem("cart");
    setCart(JSON.parse(cart));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            {/* <Route path="/about" component={About}></Route> */}
            <Route path="/products" exact component={ProductsPage}></Route>
            <Route path="/products/:_id" exact component={SingleProduct} />
            <Route path="/cart" component={Cart}></Route>
          </Switch>
        </CartContext.Provider>
      </Router>
    </>
  );
};

export default App;
