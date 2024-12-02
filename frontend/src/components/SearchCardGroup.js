import React from "react";

import { useState, useEffect } from "react";

import baseUrl from '../url'

const SearchCardGroup = (props) => {
    //EXTRAER DE LA BD
    const [myGroup, setMyGroup] = useState([])

    useEffect(() => {
        fetch(baseUrl + '/group?id=' + props.id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setMyGroup(data);
          });
    }, [baseUrl + '/group?id=' + props.id])
    
    return(
                            <div class="scrollable-card my-card w-100">
                                <div class="card mb-1">
                                    <div class="card-body d-flex flex-row text-left">
                                        <div class="col-lg-2 col-md-3">
                                            <a class="btn m-0 p-0" href={"/group?id=" + props.id}><img src={"../img/" + myGroup.logo} width="120" height="120"/></a>
                                        </div>
                                        <div class="col-lg-10 col-md-9">
                                            <a href={"/group?id=" + props.id}>
                                                <h5 class="card-title m-0 p-0">{myGroup.name}</h5>
                                            </a>
                                            <p class="mt-4">Miembros: {myGroup.members}</p>
                                            <p>Ítems: {myGroup.items}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
    );
};

export default SearchCardGroup;