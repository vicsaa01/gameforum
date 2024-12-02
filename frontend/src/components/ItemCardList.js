import React from "react";
import { useState, useEffect } from "react";

import ItemCard from "../components/ItemCard";
import baseUrl from "../url";

const ItemCardList = (props) => {

    // Crear la lista de ítems que se usará como estado del componente

    const [items, setItems] = useState([])

    // Consultar en la base de datos los ítems a meter en la lista, haciendo una petición GET a la API

    useEffect(() => {
        fetch(baseUrl + '/' + props.criteria + '-' + props.type + '?genre=' + props.genre)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setItems(data);
        });
    }, [baseUrl + '/' + props.criteria + '-' + props.type + '?genre=' + props.genre])

    // Cargar el componente con componentes ItemCard para cada ítem de la lista

    return(
                <>
                <div class="row mt-3 mb-4 text-left text-dark">
                    <div class="col-12">
                        <h3>{props.title}</h3>
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-12">
                        <div class="scrollable-card-group items-in-home">

                            {items.map((item) => (
                                <ItemCard id={item._id}/>
                            ))}

                        </div>
                    </div>
                </div>

                <br/>
                </>
    );
};

export default ItemCardList;