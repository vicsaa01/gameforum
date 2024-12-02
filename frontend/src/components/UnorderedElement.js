import React from "react";

import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import baseUrl from "../url";

const UnorderedElement = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const session = cookies['session'];
    
    // EXTRAER ELEMENTO DE LA BD

    const [element, setElement] = useState();
    const [item, setItem] = useState();

    useEffect(() => {
        fetch(baseUrl + '/list-element?id=' + props.id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setElement(data);

            fetch(baseUrl + '/item?id=' + data.item)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setItem(data);
                });
          });
    }, [baseUrl + '/list-element?id=' + props.id])

    // borrar elemento

    const handleDelete = () => {
        fetch(baseUrl + '/delete-list-element?id=' + props.id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            alert('Elemento eliminado.')
            window.location.href = '/list?id=' + props.list_id;
          });
    }

    if ((session != undefined && session.user_id == props.creator_id) && (item != undefined && element != undefined)) {
        return(
            <div class="scrollable-card my-card w-100 mb-2">
                <div class="card">
                    <div class="card-body d-flex flex-row text-left align-items-center">
                        <div class="col-lg-1 col-md-1">
                            <h5 class="card-title m-0 p-0">{props.position}.</h5>
                        </div>
                        <div class="col-lg-2 col-md-2">
                            <a class="btn m-0 p-0" href={"/item?id=" + item._id}><img src={"/img/" + item.icon} width="80" height="80"/></a>
                        </div>
                        <div class="col-lg-8 col-md-7">
                            <a href={"/item?id=" + item._id}><h5 class="card-title m-0 p-0">{item.name}</h5></a>
                        </div>
                        <div class="col-lg-1 col-md-2">
                                <a class="btn bg-dark text-white" onClick={handleDelete}>Borrar</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (item != undefined && element != undefined) {
        return(
            <div class="scrollable-card my-card w-100 mb-2">
                <div class="card">
                    <div class="card-body d-flex flex-row text-left align-items-center">
                        <div class="col-lg-1 col-md-1">
                            <h5 class="card-title m-0 p-0">{props.position}.</h5>
                        </div>
                        <div class="col-lg-2 col-md-2">
                            <a class="btn m-0 p-0" href={"/item?id=" + item._id}><img src={"/img/" + item.icon} width="80" height="80"/></a>
                        </div>
                        <div class="col-lg-8 col-md-7">
                            <a href={"/item?id=" + item._id}><h5 class="card-title m-0 p-0">{item.name}</h5></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return(
            <div class="scrollable-card my-card w-100 mb-2">
                <div class="card">
                    <div class="card-body d-flex flex-row text-left align-items-center">
                        <div class="col-lg-1 col-md-1">
                            <h5 class="card-title m-0 p-0">X.</h5>
                        </div>
                        <div class="col-lg-2 col-md-2">
                        </div>
                        <div class="col-lg-6 col-md-4">
                            <h5 class="card-title m-0 p-0">Indefinido</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default UnorderedElement;