import React, { useState, useEffect } from "react";

import { useCookies } from 'react-cookie';

import baseUrl from '../url'

const GroupMenu = (props) => {

    // get group id

    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")

    // get session

    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const session = cookies['session'];

    // es miembro

    const [isMember, setIsMember] = useState(false)

    // comprobar si es miembro o no

    useEffect(() => {
        if (session != undefined) {
            console.log(id)
            console.log(session.user_id)
            fetch(baseUrl + '/is-member?group=' + id + '&user=' + session.user_id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setIsMember(data.member)
            });
        }
    }, [])

    // unirse a grupo

    const handleJoin = () => {
        if (session != undefined) {
            if (props.group_type == 'closed') {
                const data = {
                    user: session.user_id,
                    group: props.id
                }

                console.log(data);

                fetch(baseUrl + '/send-request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
                })
                .catch((error) => {
                    alert(error);
                });
            } else if (props.group_type == 'open') {
                const data = {
                    user: session.user_id,
                    group: props.id
                }

                console.log(data);

                fetch(baseUrl + '/join-group', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
                    window.location.href = "/group?id=" + props.id;
                })
                .catch((error) => {
                    alert(error);
                });
            }
        } else {
            alert('Es necesario iniciar sesión para unirse a grupos')
        }
    }

    if (session != undefined && session.user_id == props.creator_id) {
        if (props.group_type == 'open') {
            return(
                <>
                        <div class="col-6 text-start">
                            <p class="mt-3 mb-3 text-dark">Grupo creado por tí el {props.date.day} de {props.date.month} de {props.date.year}</p>
                        </div>

                        <div class="col-6 text-end">
                                <a class="btn w-50 bg-dark text-white" href={"/edit-group?id=" + props.id}>Editar grupo</a>
                        </div>
                </>
            );
        } else {
            return(
                <>
                        <div class="col-lg-6 col-md-4 text-start">
                            <p class="mt-3 mb-3 text-dark mb-3">Grupo creado por <a href={"/user?id=" + props.creator_id}>tí</a> el {props.date.day} de {props.date.month} de {props.date.year}</p>
                        </div>

                        <div class="col-lg-3 col-md-4 text-end">
                                <a class="btn w-50 bg-white text-dark boton-volver border border-dark rounded mb-3" href={"/join-requests?group_id=" + props.id}>Ver solicitudes</a>
                        </div>

                        <div class="col-lg-3 col-md-4 text-end">
                                <a class="btn w-50 bg-dark text-white mb-3" href={"/edit-group?id=" + props.id}>Editar grupo</a>
                        </div>
                </>
            );
        }
    } else {
        if (isMember) {
            return(
                <>
                        <div class="col-12 text-start">
                            <p class="mt-3 mb-3 text-dark">Grupo creado por <a href={"/user?id=" + props.creator_id}>{props.username}</a> el {props.date.day} de {props.date.month} de {props.date.year}</p>
                        </div>
                </>
            );
        } else {
            return(
                <>
                        <div class="col-6 text-start">
                            <p class="mt-3 mb-3 text-dark">Grupo creado por <a href={"/user?id=" + props.creator_id}>{props.username}</a> el {props.date.day} de {props.date.month} de {props.date.year}</p>
                        </div>
                        <div class="col-6 text-end">
                            <a class="btn bg-dark text-white" onClick={handleJoin}>Unirse a este grupo</a>
                        </div>
                </>
            );
        }
    }
}

export default GroupMenu;