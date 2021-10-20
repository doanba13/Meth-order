import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from './MethDetailForm.module.css';

const MethDetailForm = (props) => {

    const amountInputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const inputAmount = amountInputRef.current.value;
        const amountNumber = +inputAmount;
        if( amountNumber < 1 || amountNumber > 5){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(amountNumber);
        //console.log(amountNumber);
    };

    return(
        <form className={classes.form} onSubmit={onSubmitHandler}>
            
            <Input label='Amount' 
            ref = {amountInputRef}
            input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1',
            }}/>
            <button className={classes.button}>+ Add</button>
            {!amountIsValid && <div><small>Chơi ít thôi (1-5)</small> <small>mà không chơi bấm mua làm gì ?:D</small></div>}
        </form>
    );
};

export default MethDetailForm;