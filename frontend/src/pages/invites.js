import React from "react";

import { useState, useEffect } from "react";

import InviteCard from "../components/InviteCard";
import baseUrl from '../url'

const Invites = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const user_id = queryParameters.get("user_id")

    //EXTRAER DE LA BD
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/invites?user_id=' + user_id)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setInvites(data);
        });
    }, [baseUrl + '/invites?user_id=' + user_id]);

    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-left text-dark">
                    <div class="col-12">
                        <h3>Mis invitaciones</h3>
                        <br/>
                        <p>Aquí puedes ver qué grupos te han invitado para unirte, mostrándose las invitaciones más recientes primero. Puedes aceptar o rechazar las invitaciones.</p>
                    </div>
                </div>

                <div class="row mb-4 text-left text-dark">
                </div>

                <div class="row mb-5">
                    <div class="col-12">
                        <div class="d-flex flex-row w-100 p-3">
                            <div class="col-lg-5 col-md-3 col-sm-3"><h5 class="card-title">Grupo</h5></div>
                            <div class="col-lg-7 col-md-9 col-sm-9"><p class="card-text">Enviada</p></div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="scrollable-card-group my-cards">
                            {invites.map((invite) => (
                                <InviteCard id={invite._id}/>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
    );
};

export default Invites;