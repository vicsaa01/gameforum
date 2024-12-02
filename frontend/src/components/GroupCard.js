import React from "react";

import { useState, useEffect } from "react";

import baseUrl from "../url";

const GroupCard = (props) => {
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
                            <div class="scrollable-card group">
                                <div class="card">
                                    <a class="btn m-0 p-0" href={"/group?id=" + props.id}>
                                        <img src={"../img/" + myGroup.logo} class="card-img-top" alt="Group logo" height="200" width="200"/>
                                        <div class="card-body">
                                            <h5 class="card-title">{myGroup.name}</h5>
                                        </div>
                                        <div class="card-footer">
                                            <p>{myGroup.members} miembros</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
    );
};

export default GroupCard;