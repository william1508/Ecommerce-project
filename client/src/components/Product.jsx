import { useContext } from "react";
import { StoreContext } from "../context-and-reducer/StoreContext";



const Product = ({item}) => {

  const {addToBasket} = useContext(StoreContext);
  const handleAdd = () =>{
    addToBasket(item);
    
  }

  return (
    <div>
      <ul>
        <p>{item.book}</p>
        <p>{item.author}</p>
        <p>{item.cost}</p>
        <button onClick = {handleAdd}className="addtobasket">Add to basket</button>
      </ul>
    </div>
  )
}

export default Product