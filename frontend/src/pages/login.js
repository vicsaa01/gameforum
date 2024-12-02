import React from "react";

import { useState } from "react";
import { useCookies } from 'react-cookie';
import { useLocation, Navigate } from "react-router-dom";

import baseUrl from '../url'

const Login = (props) => {

    // No mostrar la barra de navegación

    props.setNav(false);

    // Recuperar la sesión de usuario, accediendo a los cookies del navegador

    const [cookies, setCookie] = useCookies(['session']);

    // Construir el objeto formData para guardar la información del formulario

    const [formData, setFormData] = useState({
        name: '',
        pass: ''
    });

    // Función para guardar en formData las respuestas de los usuarios

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    // Función para enviar el formulario

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        // Envío de los datos por HTTP POST al servidor backend
        fetch(baseUrl + '/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
                // Si en el resultado se devuelve un token de acceso,
                // cargar el cookie de sesión con ese token y redirigir al menú de inicio
                if (data.hasOwnProperty('access_token')) {
                    let session = {
                        user_id: data.user_id,
                        access_token: data.access_token
                    };
                    setCookie('session', session, {path: '/'});
                    props.setNav(false);
                    window.location.href = '/';
                }
                // Si no, alertar de lo que ha ocurrido
                else {
                    alert(data.message);
                }
        })
        .catch((error) => {
                alert(error);
        });
    }

    // Soporte para el botón de volver atrás

    // Acceder a la ubicación y su estado para extraer la URL previa
    const location = useLocation();
    // console.log(location)
    const prevUrl = location.state.prevUrl;

    // Recuperar los parámetros de la URL previa, en caso de que los haya
    const has_id = location.state.has_id;
    var id = '';
    if (has_id) id = location.state.id;

    const has_search = location.state.has_search;
    var search = '';
    if (has_search) search = location.state.search;

    // Variable de estado goBack para determinar si se ha de volver atrás
    const [goBack, setGoBack] = useState(false);
    const handleGoBack = () => {
        setGoBack(true);
    }

    // Componente GoBack que contiene un componente Navigate, usado para navegar hacia la URL previa
    const GoBack = () => {
        if (goBack == true) {
            setGoBack(false);
            if (has_id)
                return <Navigate to={prevUrl + '?id=' + id} />;
            else
                if (has_search)
                    return <Navigate to={prevUrl + '?search=' + search} />;
                else
                    return <Navigate to={prevUrl} />;
        }
    }


    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-center text-dark">
                    <div class="col-12">
                        <h1>Inicio de sesión</h1>
                    </div>
                </div>
                
                <div class="row mb-5">
                    <div class="col-lg-4 col-md-2"></div>

                    <div class="col-lg-4 col-md-8">
                        <form onSubmit={handleSubmit}>
                            <label for="name" class="mt-3">Nombre de usuario</label>
                            <input type="text" class="form-control" name="name" value={formData.name} onChange={handleInputChange} required/>

                            <label for="pass" class="mt-3">Contraseña</label>
                            <input type="password" class="form-control" name="pass" value={formData.pass} onChange={handleInputChange} required/>
                            
                            <div class="row mt-5 mb-3">
                                <div class="col-6 text-start">
                                    <a class="btn w-100 border border-1 border-dark rounded boton-volver text-dark" href="" onClick={handleGoBack}>Volver</a>
                                    <GoBack/>
                                </div>
                                <div class="col text-end">
                                    <button type="submit" class="btn w-100 bg-dark text-white">Iniciar sesión</button>
                                </div>                                
                            </div>

                            <div class="row mt-5 text-center">
                                <div class="col">
                                    <a href="/forgot-pass">He olvidado mi contraseña</a>
                                </div>
                            </div>

                            <div class="row mt-3 text-center">
                                <div class="col">
                                    <a href="/register">Todavía no tengo una cuenta</a>
                                </div>
                            </div>

                            <div class="row mt-3 text-center">
                                <div class="col">
                                    <a href="/">Volver a la página principal</a>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="col-lg-4 col-md-2"></div>
                </div>

                <br/><br/><br/><br/><br/>
            </main>
    );
};

export default Login;