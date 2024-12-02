import React from "react";

import { useState, useEffect } from "react";

import baseUrl from "../url";

const ListCardOwner = (props) => {
    //EXTRAER USUARIO PROPIETARIO DE LA BD
    const [owner, setOwner] = useState([])

    useEffect(() => {
        fetch(baseUrl + '/user?id=' + props.id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setOwner(data);
          });
    }, [baseUrl + '/user?id=' + props.id])

    return(
        <p class="card-text">{owner.name}</p>
    );
};

export default ListCardOwner;