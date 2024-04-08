import { Children, createContext, useReducer } from "react";
import reducer, { initalState } from "./reducer";





export const StoreContext = createContext(); //exports store Context as create Context invokes my function




export const StoreProvider = ({ children })=>{ //this allows me to access the children of the StoreProvider
    const [state, dispatch] = useReducer(reducer, //declares the state and userReducer
        initalState);


        //basket function, using "...state" to update my products array.
        const addToBasket = (product, quantity = 1)=>{ 
            
            const updatedBasket = [...state.products];
            //update basket function using ...state to update the products array 

            const addItem = updatedBasket.findIndex((item) => item.id === product.id); //using findIndex function to check if an item is already in the basekt
            //the below if statement will add a new product to the basket array if the item is not currently in the baseket 
            console.log(addItem)
           
            if( addItem !== -1){ //this checks if the item is NOT equal to anyhting currently in the basket.
                updatedBasket[addItem].quantity += quantity; // adds one to the quantity if already in the basket
                updatePrice(updatedBasket) //invokes my updated price function updating the total.
                dispatch({type: "add", payload: [...updatedBasket]} ) 
                // the dispatchs type is add and the payload will be the updated quantity to the basket.
                
                
            }else { // if the item is not already in the basket this will create the First item and add the quantity.
                // Add the item to the basket
                const updatedBasketWithNewProduct = [...updatedBasket, { ...product, quantity }];
                // Update the price
                updatePrice(updatedBasketWithNewProduct);
                // Dispatch the updated basket
                dispatch({
                    type: "add",
                    payload: updatedBasketWithNewProduct
                });
                             
            }
            
        }
        
        const removeFromBasket = (product) => {
            // Find the index of the product to be removed in the basket
            const existingIndex = state.products.findIndex(item => item.id === product.id); 
            
         // Check if the product exists in the basket
            if (existingIndex !== -1) {
                 // Create a copy of the current basket
                const updatedBasket = [...state.products];        
                  // Check if the quantity of the product is greater than 1
                if (updatedBasket[existingIndex].quantity > 1) {
                    // If quantity is greater than one, decrement the quantity
                    updatedBasket[existingIndex].quantity--;
                } else {
                    // If quantity is one, remove the product entirely
                    updatedBasket.splice(existingIndex, 1);
                }
        
                // Update the price after modifying the basket
                updatePrice(updatedBasket);
        
                // Dispatch the updated basket
                dispatch({
                    type: "remove",
                    payload: updatedBasket
                });
                
            }
        }


        
        const updatePrice = (products)=>{
            let total = 0; //sets the total to 0
             // Iterate through each product in the basket
            products.forEach(product =>{
                // Calculate the subtotal for each product by multiplying its cost with its quantity
                total += product.cost * product.quantity
                
            })
             // Dispatch an action to update the total price
            dispatch({
                type:"update price",
                payload: total
                
            })
        }

        const value = { //sets the value to total, products and the add/remove functions
            total:state.total,
            products:state.products,
            addToBasket,
            removeFromBasket
        }
        //return allows access to the children of Value, allowing me to access the functions.
        return <StoreContext.Provider value={value}> 
            {children} 
        </StoreContext.Provider>
}