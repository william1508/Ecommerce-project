export const initalState ={ //the inital state hold the total cost and products array
    total:0,
    products:[]
}

const StoreReducer = (state, action)=>{
    switch (action.type){
        case "add":
            return{
                ...state,
                products: action.payload
            }
        case "remove":
            return{
                ...state,
                products: action.payload
            }
        case "update price":
            return{
                ...state,
                total: action.payload
            }
        default: throw Error("cannot match case in reducer")
    }
}


export default StoreReducer