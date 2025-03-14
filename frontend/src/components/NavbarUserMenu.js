import React from "react";

import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from "react-router-dom";

import baseUrl from '../url'

const NavbarUserMenu = (props) => {

    const [cookies, setCookie] = useCookies(['session']);
    const session = cookies['session'];

    //EXTRAER DE LA BD

    const [myUser, setMyUser] = useState([]);

    useEffect(() => {
        if (session != undefined) {
            fetch(baseUrl + '/user?id=' + session.user_id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setMyUser(data);
            });
        }
    }, [baseUrl + '/user?id='])

    //IR AL LOGIN

    const location = useLocation();
    const url = location.pathname;

    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")
    const search = queryParameters.get("search")

    const [toLogin, setToLogin] = useState(false);

    const handleLogin = () => {
        setToLogin(true);
    }

    const ToLogin = () => {
        if (toLogin == true) {
            setToLogin(false);

            if (url == null || url == "") url = "/" // default url <- error que vio David (Linux no deja guardar URL?)

            if (id == null)
                if (search == null)
                    return <Navigate to="/login" state={{prevUrl: url, has_id: false, id: id, has_search: false, search: search}} />;
                else
                    return <Navigate to="/login" state={{prevUrl: url, has_id: false, id: id, has_search: true, search: search}} />;
            else
                return <Navigate to="/login" state={{prevUrl: url, has_id: true, id: id, has_search: false, search: search}} />;
        }
    }

    // CONSTRUIR MENÚ
    
    if (session != undefined) {
        return(
            <>
                <a href={"/user?id=" + myUser._id}>
                    <img src={'/img/' + myUser.avatar} class="rounded-circle mt-lg-0 mt-md-0 mt-sm-0 mt-2" width="40" height="40" />
                </a>
            </>
        )
    } else {
        return(
            <div class="d-flex justify-content-end text-end">
                <a class="btn bg-white text-dark fw-bold pt-2 boton-login" href="/login" onClick={handleLogin}>Inicio</a>
                <ToLogin/>
            </div>
        )
    }
}

export default NavbarUserMenu;