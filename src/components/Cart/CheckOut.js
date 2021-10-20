import useInput from "../../hooks/use-input";
import classes from "./CheckOut.module.css";

const CheckOut = props => {
    const {
        value: nameValue,
        valueIsValid: nameIsValid,
        inputInvalid: nameInputInvalid,
        onChangeHandler: nameChange,
        onBlurHandler: nameBlur,
        reset: nameReset
    } = useInput(value => value.trim() !== '');
    const {
        value: streetValue,
        valueIsValid: streetIsValid,
        inputInvalid: streetInputInvalid,
        onChangeHandler: streetChange,
        onBlurHandler: streetBlur,
        reset: streetReset
    } = useInput(value => value.trim() !== '');
    const {
        value: codeValue,
        valueIsValid: codeIsValid,
        inputInvalid: codeInputInvalid,
        onChangeHandler: codeChange,
        onBlurHandler: codeBlur,
        reset: codeReset
    } = useInput(value => value.trim() !== '');
    const {
        value: cityValue,
        valueIsValid: cityIsValid,
        inputInvalid: cityInputInvalid,
        onChangeHandler: cityChange,
        onBlurHandler: cityBlur,
        reset: cityReset
    } = useInput(value => value.trim() !== '');

    let formIsValid = false;
    if( !nameInputInvalid && !streetInputInvalid && !codeInputInvalid && !cityInputInvalid){
        formIsValid = true
        console.log(formIsValid)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (!nameIsValid && !streetIsValid && !codeIsValid && !cityIsValid){
            formIsValid = false;
            return
        }
        console.log(formIsValid)
        props.onConfirm({
            name: nameValue,
            street: streetValue,
            postalCode: codeValue,
            city: cityValue
        });
        nameReset();
        streetReset();
        codeReset();
        cityReset();
    };

    const nameClasses = `${classes.formControl} ${nameInputInvalid ? classes.invalid : '' }`
    const streetClasses = `${classes.formControl} ${streetInputInvalid ? classes.invalid : '' }`
    const codeClasses = `${classes.formControl} ${codeInputInvalid ? classes.invalid : '' }`
    const cityClasses = `${classes.formControl} ${cityInputInvalid ? classes.invalid : '' }`

    return(
        <form onSubmit={onSubmitHandler}>
            <div className={nameClasses}>
                <label htmlFor='name'>Your name</label>
                <input type='text' id='name'onChange={nameChange} onBlur={nameBlur} value={nameValue}/>
                {nameInputInvalid && <small>Please enter your Name</small>}
            </div>
            <div className={streetClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' onChange={streetChange} onBlur={streetBlur} value={streetValue}/>
                {streetInputInvalid && <small>Please enter your Street</small>}
            </div>
            <div className={codeClasses}>
                <label htmlFor='postalCode'>Postal code</label>
                <input type='number' id='code' onChange={codeChange} onBlur={codeBlur} value={codeValue}/>
                {codeInputInvalid && <small>Please enter your Postal code</small>}
            </div>
            <div className={cityClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' onChange={cityChange} onBlur={cityBlur} value={cityValue}/>
                {cityInputInvalid && <small>Please enter your City</small>}
            </div>
            <div className={classes.buttonControl}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.confirm} disabled={!formIsValid}>Confirm</button>
            </div>
        </form>
    );
};

export default CheckOut;