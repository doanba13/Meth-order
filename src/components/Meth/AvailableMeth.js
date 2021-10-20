import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card";
import classes from "./AvailableMeth.module.css";
import MethDetail from "./MethDetail/MethDetail";

const AvailableMeth = () => {
    const [meths, setMeths] = useState([]);
    const {isLoading, error, sendRequest: getData} = useHttp();

    useEffect(() => {
        const getDataHandler = (data) => {
            const loadedMeth = [];
            for (const key in data){
                loadedMeth.push({id: data[key].id, description: data[key].description, name: data[key].name, price: data[key].price});
            }
            setMeths(loadedMeth);
        };
    
        getData({
            url: 'https://reactjs-http-6c44b-default-rtdb.firebaseio.com/Meth.json'
        },getDataHandler); 
    }, []);


    const MethList = meths.map( meth => <MethDetail key={meth.id} name={meth.name} id={meth.id} description={meth.description} price={meth.price}/> );

    return(
        <ul className={classes.avaMeth}>
            <Card>
            {isLoading === true && <small>Loading meths...</small>}
            {error !== null && <small>Somthing went wrong :( </small>}
            {MethList}
            </Card>
        </ul>
    );
};

export default AvailableMeth;