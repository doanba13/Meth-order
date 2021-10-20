import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "./Modal";
import CartContext from "../../store/cart-context";
import ItemsList from "./ItemsList";
import CheckOut from "./CheckOut";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
    const [checkOut, setCheckOut] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartContext = useContext(CartContext);

    const {isLoading, error, sendRequest: sendData} = useHttp();
    
    const anyItemOnCart = cartContext.items.length > 0;
    const totalAmounts = `$${cartContext.totalAmounts.toFixed(2)}`;

    const onRemoveHandler = (id) => {
        cartContext.removeItems(id);
    };
    const onAddHandler = (item) => {
        cartContext.addItems({...item, amount: 1});
    };
    const onOrderHandler = () => {
        setCheckOut(true);
    };
    const onConfirmHandler = (confirmData) => {
        sendData({
            url: 'https://reactjs-http-6c44b-default-rtdb.firebaseio.com/orderUser.json',
            method: 'POST',
            body: {
                user: confirmData,
                items: cartContext.items
            }
        });
        setDidSubmit(true);
        cartContext.clearCart();
    }; 


    const orderButton = <div className={classes.button}>
                            <button className={classes.close} onClick={props.onCloseCart}>Close</button>
                            {anyItemOnCart && <button className={classes.order} onClick={onOrderHandler}>Order</button>}
                        </div>
    const cartModalContent = <React.Fragment>
            <ul className={classes.list}>
                {cartContext.items.map((meth) => <ItemsList key={meth.id} onRemove={onRemoveHandler.bind(null, meth.id)} onAdd={onAddHandler.bind(null, meth)} name={meth.name} price={meth.price} amount={meth.amount}/>) }
            </ul>
            <div className={classes.action}>
                <span>Totals</span>
                <span>{totalAmounts}</span>
            </div>
            {checkOut && anyItemOnCart && <CheckOut onConfirm={onConfirmHandler} onCancel={props.onCloseCart}/>}
            {!checkOut && orderButton}
    </React.Fragment>


    const sendingData = <p>Sending order...</p>
    const sentData = <p>Successfully! Thanks for your order :D</p>

    return(
        <Modal onClick={props.onCloseCart} >
            {isLoading===false && error===null && cartModalContent}
            {isLoading===true && sendingData}
            {isLoading===false && didSubmit===true && sentData}
        </Modal>
    );
};

export default Cart;