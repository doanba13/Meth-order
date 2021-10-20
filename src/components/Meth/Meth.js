import React from "react";
import AvailableMeth from "./AvailableMeth";
import MethSumary from "./MethSumary";
import classes from "./Meth.module.css";

const Meth = () => {
    return(
        <div className={classes.Meth}>
            <MethSumary />
            <AvailableMeth/>
        </div>
    );
};

export default Meth;