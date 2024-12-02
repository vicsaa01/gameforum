import React from "react";

import { useCookies } from 'react-cookie';
import { useState } from "react";

import baseUrl from "../url";

const CreateList = () => {

    // Recuperar la sesión de usuario, accediendo a los cookies del navegador

    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const session = cookies['session'];

    // Construir el objeto formData para guardar la información del formulario

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        scope: '',
        creator_id: ''
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

        // Guardar la ID del usuario accediendo a la sesión
        formData.creator_id = session.user_id;

        console.log(formData);

        // Envío de los datos por HTTP POST al servidor backend
        fetch(baseUrl + '/create-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
            alert('Se ha creado la lista');
            // Reiniciar los datos del formulario
            setFormData({
                name: '',
                type: '',
                scope: '',
                creator_id: ''
            });
            // Navegar a la página de la lista creada
            window.location.href = '/list?id=' + data._id;
        })
        .catch((error) => {
            // Alertar en caso de error
            alert(error);
        });
    }

    // Cargar la página con el formulario si se ha iniciado sesión

    if (session != undefined){
        return(
            <main class="m-5">
                    <div class="row mb-3 text-center">
                        <div class="col-lg-3 col-md-2"></div>

                        <div class="col-lg-6 col-md-8">
                            <h3 class="mb-5 text-dark">Crear una lista nueva</h3>

                            <form id="form" onSubmit={handleSubmit}>
                                <div class="row mb-5 text-start">
                                    <label for="name" class="mb-2 p-1">Nombre:</label>
                                    <input name="name" type="text" class="form-control" value={formData.name} onChange={handleInputChange} autoComplete="off" minlength="1" maxlength="80" required/>
                                </div>

                                <div class="row text-start">
                                    <label for="scope" class="mb-2 p-1">Elige el ámbito:</label>
                                </div>

                                <div class="row mb-5 text-start">
                                    <div class="col w-100 p-3 border rounded">
                                        <div class="form-check mb-3">
                                            <input name="scope" type="radio" class="form-check-input" id="scope1" value="pública" onChange={handleInputChange} required/>
                                            <label for="scope1" class="form-check-label">Pública</label>
                                        </div>
                                        <div class="form-check">
                                            <input name="scope" type="radio" class="form-check-input" id="scope2" value="privada" onChange={handleInputChange} required/>
                                            <label for="scope2" class="form-check-label">Privada</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row text-start">
                                    <label for="scope" class="mb-2 p-1">Elige el tipo:</label>
                                </div>

                                <div class="row mb-5 text-start">
                                    <div class="col w-100 p-3 border rounded">
                                        <div class="form-check mb-3">
                                            <input name="type" type="radio" class="form-check-input" id="type1" value="lista" onChange={handleInputChange} required/>
                                            <label for="type1" class="form-check-label">Lista (los ítems se podrán ordenar por nombre, fecha o popularidad)</label>
                                        </div>
                                        <div class="form-check">
                                            <input name="type" type="radio" class="form-check-input" id="type2" value="encuesta" onChange={handleInputChange} required/>
                                            <label for="type2" class="form-check-label">Encuesta (Los ítems pueden recibir votos de los usuarios)</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row m-5"></div>

                                <div class="row p-0 mb-5">
                                    <div class="col-6 p-0 text-start">
                                        <a class="btn w-50 border border-1 border-dark rounded boton-volver text-dark" href="/community">Volver</a>
                                    </div>
                                    <div class="col-6 p-0 text-end">
                                        <button type="submit" class="btn w-50 bg-dark text-white">Crear lista</button>
                                    </div>                                
                                </div>
                            </form>
                        </div>

                        <div class="col-lg-3 col-md-2"></div>
                    </div>
                </main>
        );
    }
    
    // Si no se ha iniciado sesión, se carga una página que avisa de que es necesario tener una cuenta e iniciar sesión

    else {
        return(
            <main class="m-5">
                <div class="row mb-3 text-center">
                    <div class="col">
                        <br/>
                        <h3>Se requiere inicio de sesión</h3>
                        <p>Es necesario tener una cuenta e iniciar sesión para poder crear grupos y listas o iniciar discusiones</p>
                        <br/><br/><br/>
                    </div>
                </div>
            </main>
        )
    }
};

export default CreateList;