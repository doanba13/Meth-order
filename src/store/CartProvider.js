import { useReducer } from "react";
import CartContext from "./cart-context";

const defautCartReducer = {
    items: [],
    totalAmounts: 0,
};

const cardReducer = (state, action) => {
    if(action.type === 'ADD'){
        //console.log(action.items.price);
        //console.log(action.items.amount);
        const updatedAmounts = state.totalAmounts + action.item.price*action.item.amount;
        const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id );
        const existingItem = state.items[existingItemIndex];
        let updatedItems;

        if(existingItem){
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else{
            updatedItems = state.items.concat(action.item);
        }
        console.log(updatedItems);
        return {
            items: updatedItems,
            totalAmounts: updatedAmounts
        };
    }

    if(action.type === 'REMOVE'){
        const existingItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingItemIndex];
        let updatedItems;

        if(existingItem.amount === 1){
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else{
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        const updatedAmounts = state.totalAmounts - existingItem.price;
        return{
            items: updatedItems,
            totalAmounts: updatedAmounts
        };
    }
    if( action.type === 'CLEAR'){
        return defautCartReducer;
    }

    return defautCartReducer;
};

const CartProvider = props => {
    const [cartState, dispatchCartState] = useReducer(cardReducer, defautCartReducer);

    const addItemsHandle = (items) => {
        dispatchCartState({type: 'ADD', item: items});
    };
    const removeItemsHandle = (id) => {
        dispatchCartState({type: 'REMOVE', id: id});
    };
    const clearCartHandle = () => {
        dispatchCartState({type: 'CLEAR'});
    };
    const cartContext = {
        items: cartState.items,
        totalAmounts: cartState.totalAmounts,
        addItems: addItemsHandle,
        removeItems: removeItemsHandle,
        clearCart: clearCartHandle
    };
    console.log(cartState.totalAmounts)

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;