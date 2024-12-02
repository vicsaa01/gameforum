import React from "react";
import { useState, useEffect } from "react";

import baseUrl from '../url'

const SearchCardList = (props) => {
    //EXTRAER DE LA BD
    const [myList, setMyList] = useState([])

    useEffect(() => {
        fetch(baseUrl + '/list?id='+props.id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setMyList(data);
          });
    }, [baseUrl + '/list?id='+props.id])
    
    return(
                            <div class="scrollable-card my-card w-100">
                                <div class="card mb-1">
                                    <div class="card-body d-flex flex-row text-left">
                                        <div class="col-lg-10 col-md-9">
                                            <a href={"/list?id=" + props.id}>
                                                <h5 class="card-title m-0 p-0">{myList.name}</h5>
                                            </a>
                                            <p class="mt-4">Tipo: {myList.type}</p>
                                            <p>Ítems: {myList.items}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
    );
};

export default SearchCardList;