import React from "react";
import classes from "./ItemsList.module.css";

const ItemsList = (props) => {
    
    const price = `$${props.price}`;

    return (
        <li className={classes.list}>
            <div>
                <label className={classes.name}>{props.name}</label>
                <div className={classes.span}>
                    <span className={classes.price}>{price}</span>
                    <span className={classes.amount}>x{props.amount}</span>
                </div>
            </div>
            <div>
                <button className={classes.remove} onClick={props.onRemove}>-</button>
                <button className={classes.add} onClick={props.onAdd}>+</button>
            </div>
        </li>
    );
};

export default ItemsList;