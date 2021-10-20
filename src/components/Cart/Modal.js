import { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const ModalOverlay = props => {
    return(
        <div className={classes.overlay}>{props.children}</div>);
};

const Backdrop = props => {
    return(<div className={classes.backdrop} onClick={props.onClick}></div>);
};

const portalElement = document.getElementById('overlay');

const Modal = (props) => {
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
};

export default Modal;