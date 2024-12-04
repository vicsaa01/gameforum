import React from "react";

import { useState, useEffect } from "react";

import baseUrl from "../url";

const ListCard = (props) => {
    //EXTRAER LISTA DE LA BD
    const [myList, setMyList] = useState([])

    const [myUser, setMyUser] = useState([])

    useEffect(() => {
        fetch(baseUrl + '/list?id=' + props.id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setMyList(data);

            fetch(baseUrl + '/user?id=' + data.creator_id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setMyUser(data);
            });
          });
    }, [baseUrl + '/list?id=' + props.id])

    return(
                            <div class="scrollable-card my-card w-100">
                                <div class="card">
                                    <a class="btn m-0 p-0" href={"/list?id=" + props.id}>
                                        <div class="card-body d-flex flex-row text-start">
                                            <div class="col-lg-6 col-md-4"><h5 class="card-title">{myList.name}</h5></div>
                                            <div class="col-lg-2 col-md-3 d-none d-md-block"><p class="card-text">{myList.type}</p></div>
                                            <div class="col-lg-2 col-md-3 d-none d-md-block"><p class="card-text">{myUser.name}</p></div>
                                            <div class="col-lg-2 col-md-2 d-none d-md-block"><p class="card-text">{myList.views}</p></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
    );
};

export default ListCard;