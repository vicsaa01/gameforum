import React from "react";
import { useState, useEffect } from "react";

import baseUrl from '../url'

const SearchCardItem = (props) => {
    //EXTRAER DE LA BD
    const [myItem, setMyItem] = useState([])

    useEffect(() => {
        fetch(baseUrl + '/item?id='+props.id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setMyItem(data);
          });
    }, [baseUrl + '/item?id='+props.id])
    
    return(
                            <div class="scrollable-card my-card w-100">
                                <div class="card mb-1">
                                    <div class="card-body d-flex flex-row text-left">
                                        <div class="col-lg-2 col-md-3">
                                            <a class="btn m-0 p-0" href={"/item?id=" + props.id}><img src={"../img/" + myItem.icon} width="120" height="120"/></a>
                                        </div>
                                        <div class="col-lg-10 col-md-9">
                                            <a href={"/item?id=" + props.id}>
                                                <h5 class="card-title m-0 p-0">{myItem.name}</h5>
                                            </a>
                                            <p class="mt-4">Género: {myItem.genres}</p>
                                            <p>Año: {myItem.year}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
    );
};

export default SearchCardItem;