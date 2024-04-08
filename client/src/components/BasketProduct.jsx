import React from 'react'
import { useContext } from "react";
import { StoreContext } from "../context-and-reducer/StoreContext";

const BasketProduct = ({item}) => { //basket function
    
  const {removeFromBasket} = useContext(StoreContext); // importing over the removeFromBasket function using context
  const handleRemove = () =>{
    removeFromBasket(item);
    
  }
// console.log(item)

  return ( // displays the information imported from SQL 
    <div>
         <ul>
        <p>{item.book}</p>
        <p>{item.author}</p>
        <p>£{item.cost.toFixed(2) *item.quantity}</p>
        </ul>
        <p>{item.quantity}</p>
        <button onClick={handleRemove} className="removefrombasket">Remove</button>
    </div>
  )
}

export default BasketProduct