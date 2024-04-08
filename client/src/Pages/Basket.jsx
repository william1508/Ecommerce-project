import React, { useContext } from 'react'
import { StoreContext } from '../context-and-reducer/StoreContext'
import Navbar from '../components/Navbar'
import BasketProduct from '../components/BasketProduct'

const Basket = () => {
  const {products, total}=useContext(StoreContext)
  
  // Assertion to check if products are not undefined
  console.assert(products !== undefined, "Products are undefined");
  // Assertion to check if total is not undefined
  console.assert(total !== undefined, "Total is undefined");

  return (
    <div className="basket">
      <div>
        <Navbar />
        <h3>Your Basket</h3>
        <p>Total: £{total.toFixed(2)}</p>
      </div>
      <div className="basket-products">
        {products.map((product, i) => (
          <BasketProduct
            key={i}
            item={product}
          />
        ))}
      </div>
    </div>
  )
}


export default Basket