import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
    const [buttonHighlight, setButtonHighlight] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const btnClass = `${classes.CartButton} ${ buttonHighlight? classes.bump : ''}`;
    
    const cartButtonAmount = items.reduce((currNumber,item) => {
        return currNumber + item.amount; 
    }, 0);
    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setButtonHighlight(true);
        const timer = setTimeout(() => {
            setButtonHighlight(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return(
        <div className={btnClass} onClick={props.onClick}>
            <span className={classes.CartName}>Your Cart</span>
            <span className={classes.CartAmount}>{cartButtonAmount}</span>
        </div>
    );
};

export default CartButton;