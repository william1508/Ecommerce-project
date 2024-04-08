import { useContext } from "react"
import { Link } from "react-router-dom"
import { StoreContext } from "../context-and-reducer/StoreContext"
import BasketIcon from "../img/BasketIcon.png"

const Navbar = () => {
  const{products} = useContext(StoreContext);
  let totalQuantity = 0;
  products.forEach(item =>{
    totalQuantity += item.quantity;
  })
  return (
   
<div className="navbar">
  <h1 className="navbar-title">Book Store</h1>
  <nav className="navbar-links">
    <Link to="/" className="navbar-link">Home</Link>
    <Link to="/basket" className="navbar-link">
      <img src={BasketIcon} alt="Basket Icon" className="basket-icon" />
      <span className="basket-quantity">{totalQuantity}</span>
    </Link>
  </nav>
</div>
  )
}

export default Navbar

