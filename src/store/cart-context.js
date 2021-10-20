import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmounts: 0,
    addItems: (items) => {},
    removeItems: (id) => {},
    clearCart: () => {}
}); 

export default CartContext;