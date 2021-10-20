import { useReducer } from "react";

const initialState = {
    value: '',
    isTouched: false
};
const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT'){
        return {
            value: action.value,
            isTouched: state.isTouched
        }}
    if (action.type === 'BLUR'){
        return {
            value: state.value,
            isTouched: true
        }}
    if (action.type === 'RESET'){
        return {
            value: '',
            isTouched: false
        }}
    return initialState;
};

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialState);
    const valueIsValid = validateValue(inputState.value);
    const inputInvalid = !valueIsValid && inputState.isTouched;
    
    const onChangeHandler = (event) => {
        dispatch({type:'INPUT', value: event.target.value})
    }; 
    const onBlurHandler = () => {
        dispatch({type:'BLUR'});
    }; 
    const reset = () => {
        dispatch({type: 'RESET'});
    };
    return{
        value: inputState.value,
        valueIsValid,
        inputInvalid,
        onChangeHandler,
        onBlurHandler,
        reset
    };
};

export default useInput;