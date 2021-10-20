import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MethDetail.module.css";
import MethDetailForm from "./MethDetailForm";

const MethDetail = props => {
    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItems({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
        //console.log(cartCtx);s
    };

    return(
        <li className={classes.border}>
            <div >
                <p className={classes.name}>{props.name}</p>
                <i className={classes.description}>{props.description}</i>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MethDetailForm id={props.id} onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
};

export default MethDetail;