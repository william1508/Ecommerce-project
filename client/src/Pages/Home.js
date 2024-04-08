import React from 'react'
import Data from '../Products.json'
import Navbar from '../components/Navbar'
import Product from '../components/Product'



const Home = () => {
    
  return (
    <div className="home">
    <Navbar />

    <div className="product-list">
      {Data.map((item, i) => (
        <Product
          key={i}
          item={item}
        />
      ))}
    </div>
  </div>
  )
}

export default Home