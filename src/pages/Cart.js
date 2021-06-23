import React,{useContext, useEffect, useState} from "react";
import {CartContext} from './CartContext'

const Cart = () => {

  let total = 0;

  const [products,setProducts] = useState([]);
  const {cart,setCart} = useContext(CartContext)

  const [priceFetched,togglePriceFetched] = useState(false);

  useEffect(()=>{
    if(!cart.items){
      return
    }
    if(priceFetched){
      return;
    }
    fetch('https://ecom-rest-apis.herokuapp.com/api/products/cart-items',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ids:Object.keys(cart.items)})
    }).then(res=>res.json()).then(products=>{
      setProducts(products);
      togglePriceFetched(true);
    })
  },[cart]);

  const getQty = (productId) => { 
    return cart.items[productId]
  } 

  const increment = (productId) => {
    const oldQty  = cart.items[productId];
    const _cart = {...cart};
    _cart.items[productId]=oldQty+1;
    _cart.totalItems += 1;
    setCart(_cart);
  }

  const decrement = (productId) => {
    const oldQty  = cart.items[productId];
    if(oldQty===1){
      return;
    }
    const _cart = {...cart};
    _cart.items[productId]=oldQty-1;
    _cart.totalItems -= 1;
    setCart(_cart);
  }

  const getSum = (productId,price) => {
    const sum = price * getQty(productId)
    total+=sum;
    return sum
  } 

const handleDelete = (productId) => {
  const _cart = {...cart};
  const qty = _cart.items[productId];
  delete _cart.items[productId]
  _cart.totalItems -= qty;
  setCart(_cart);
  setProducts(products.filter((product)=>product._id !== productId))
}

  return (

    !products.length ? 
    <img className="mx-auto w-1/2 mt-12" src="/images/empty-cart.png" alt="your cart is empty" /> 
    :
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart items</h1>
      <ul>
        {
          products.map(product=>{
            return(
              <li className="mb-12" key={product._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    height="100"
                    width="100"
                    src="/images/pizza.jpg"
                    alt="cart items"
                  />
                  <span className="font-bold ml-4 w-48">{product.name}</span>
                </div>
    
                <div className="">
                  <button
                  onClick={()=>{decrement(product._id)}}
                    style={{ outline: "none" }}
                    className="bg-yellow-500 py-1 px-4 rounded-full font-bold"
                  >
                    -
                  </button>
                  <b className="px-4">{ getQty(product._id) }</b>
                  <button onClick={()=>{increment(product._id)}}
                    style={{ outline: "none" }}
                    className="bg-yellow-500 py-1 px-4 rounded-full font-bold"
                  >
                    +
                  </button>
                </div>
    
                <span>₹ {getSum(product._id,product.price)}</span>
                <button
                  onClick={()=>{handleDelete(product._id)}}
                  style={{ outline: "none" }}
                  className="bg-red-500 text-white px-4 py-2 rounded-full leading-none "
                >
                  Delete
                </button>
              </div>
            </li>
            )
          })
        }
       


      </ul>
    <hr className="my-6" />
    <div className="text-right">
      <b>Grand Total</b> : ₹ {total}
    </div>
<div className="text-right mt-6">
  <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none">Order Now</button>
</div>
    </div> 
  );
};

export default Cart;
