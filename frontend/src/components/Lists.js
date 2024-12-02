import React from "react";

import { useState, useEffect } from "react";

import ListCard from "./ListCard";
import baseUrl from "../url";

const Groups = () => {
    //EXTRAER LISTAS DE LA BD
    const [lists, setLists] = useState([])

    useEffect(() => {
        fetch(baseUrl + '/lists')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setLists(data);
          });
    }, [baseUrl + '/lists'])

    return(
        <>
                <div class="row mb-4 text-left">
                    <div class="col-8"><h3>Explorar listas y encuestas</h3></div>

                    <div class="col-4">
                        <div class="d-flex flex-row justify-content-end">
                            <a class="btn m-0 r-0 bg-dark text-white" href="/create-list">
                                + Crear nueva lista
                            </a>
                        </div>
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-12">
                        <div class="d-flex flex-row w-100 p-3">
                            <div class="col-lg-6 col-md-4"><h5 class="card-title">Nombre</h5></div>
                            <div class="col-lg-2 col-md-3 d-none d-md-block"><p class="card-text">Tipo</p></div>
                            <div class="col-lg-2 col-md-3 d-none d-md-block"><p class="card-text">Creada por</p></div>
                            <div class="col-lg-2 col-md-2 d-none d-md-block"><p class="card-text">Visitas</p></div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="scrollable-card-group my-cards">
                            {lists.map((list) => (
                                <ListCard id={list._id}/>
                            ))}
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Groups;