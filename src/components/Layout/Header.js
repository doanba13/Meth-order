import { Fragment } from "react";
import classes from "./Header.module.css";
import headerBg from "../../assets/header_bg.jpg"
import CartButton from "./CartButton";

const Header = (props) => {
    return(
        <Fragment>
            <header className={classes.Header}>
                <h1>MethOrder :D</h1>
                <CartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes.BackgroundImg}>
                <img src={headerBg} alt="Shoe toe, lot of grass and a bird draw"/>
            </div>
        </Fragment>
    );
};

export default Header;