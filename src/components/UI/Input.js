import classes from "./Input.module.css";
import React from "react";

const Input = React.forwardRef((props, ref) => {
    return(
        <div>
            <label className={classes.label} htmlFor={props.input.id}>{props.label}</label>
            <input className={classes.input} ref={ref} {...props.input}/>
        </div>
    );
});
export default Input;