import React from "react";

import { useCookies } from 'react-cookie';
import { useState } from "react";

import baseUrl from "../url";

const CreateDiscussion = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const group_id = queryParameters.get("group_id")

    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const session = cookies['session'];

    const [formData, setFormData] = useState({
        title: '',
        text: '',
        tags: '',
        group_id: group_id,
        creator_id: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        formData.creator_id = session.user_id;

        console.log(formData);

        fetch(baseUrl + '/create-discussion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
            alert('Se ha creado la discusión');
            setFormData({
                title: '',
                text: '',
                tags: '',
                group_id: group_id,
                creator_id: ''
            });
            window.location.href = '/discussion?id=' + data._id;
        })
        .catch((error) => {
            alert(error);
        });
    }

    if (session != undefined) {
        return(
            <main class="m-5">
                    <div class="row mb-3 text-center">
                        <div class="col-lg-3 col-md-2"></div>

                        <div class="col-lg-6 col-md-8">
                            <h3 class="mb-5 text-dark">Iniciar una discusión</h3>

                            <form onSubmit={handleSubmit}>
                                <div class="row mb-5 p-0 text-start">
                                    <label for="title" class="mb-2 p-1">Título:</label>
                                    <input name="title" type="text" class="form-control" value={formData.title} onChange={handleInputChange} autoComplete="off" minlength="1" maxlength="80" required/>
                                </div>

                                <div class="row mb-5 p-0 text-start">
                                    <label for="text" class="mb-2 p-1">Texto:</label>
                                    <textarea name="text" class="form-control" value={formData.text} onChange={handleInputChange} required/>
                                </div>

                                <div class="row mb-5 p-0 text-start">
                                    <label for="tags" class="mb-2 p-1">Ítem sobre el que trata la discusión (opcional):</label>
                                    <input name="tags" type="text" class="form-control" value={formData.tags} onChange={handleInputChange} autoComplete="off"/>
                                </div>

                                <div class="row m-5"></div>

                                <div class="row p-0 mb-5">
                                    <div class="col-6 p-0 text-start">
                                        <a class="btn w-50 border border-1 border-dark rounded boton-volver text-dark" href={"/group?id=" + group_id}>Volver</a>
                                    </div>
                                    <div class="col-6 p-0 text-end">
                                        <button type="submit" class="btn w-50 bg-dark text-white">Iniciar</button>
                                    </div>                                
                                </div>
                            </form>

                            <br/><br/><br/>
                        </div>

                        <div class="col-lg-3 col-md-2"></div>
                    </div>
                </main>
        );
    } else {
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

export default CreateDiscussion;