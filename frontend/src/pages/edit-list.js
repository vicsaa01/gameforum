import React from "react";

import { useState } from "react";

import baseUrl from "../url";

const EditList = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")

    const [formData, setFormData] = useState({
        name: '',
        scope: ''
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

        console.log(formData);

        fetch(baseUrl + '/edit-list?id=' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.modified == 1) {
                alert('Se ha actualizado la lista');
                setFormData({
                    name: '',
                    scope: ''
                });
                window.location.href = '/list?id=' + id;
            } else {
                alert('No se ha podido actualizar la lista. Comprueba que los valores son distintos a los anteriores.')
            }
        })
        .catch((error) => {
            alert(error);
        });
    }

    return(
        <main class="m-5">
                <div class="row mb-3 text-center">
                    <div class="col-lg-3 col-md-2"></div>

                    <div class="col-lg-6 col-md-8">
                        <h3 class="mb-5 text-dark">Editar lista</h3>

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

                            <div class="row m-5"></div>

                            <div class="row p-0 mb-5">
                                <div class="col-6 p-0 text-start">
                                    <a class="btn w-50 border border-1 border-dark rounded boton-volver text-dark" href={"/list?id=" + id}>Volver</a>
                                </div>
                                <div class="col-6 p-0 text-end">
                                    <button type="submit" class="btn w-50 bg-dark text-white">Guardar</button>
                                </div>                                
                            </div>

                            <br/><br/><br/>
                        </form>
                    </div>

                    <div class="col-lg-3 col-md-2"></div>
                </div>
            </main>
    );
};

export default EditList;