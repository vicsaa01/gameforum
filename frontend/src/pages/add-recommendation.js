import React from "react";

import { useState } from "react";

import baseUrl from "../url";

const AddRecommendation = () => {

    // get parameters

    const queryParameters = new URLSearchParams(window.location.search)
    const item_id = queryParameters.get("item_id")

    // add recommendation

    const [formData, setFormData] = useState({
        item: '',
        name: '',
        type: ''
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

        formData.item = item_id;

        console.log(formData);

        fetch(baseUrl + '/add-recommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            if (data.hasOwnProperty('item')) {
                setFormData({
                    item: '',
                    name: '',
                    type: ''
                });
                window.location.href = '/item?id=' + data.item;
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
                        <h3 class="mb-5 text-dark">Añadir una recomendación</h3>

                        <form onSubmit={handleSubmit}>
                            <div class="row mb-5 p-0 text-start">
                                <label for="name" class="mb-2 p-1">Nombre:</label>
                                <input name="name" type="text" class="form-control" value={formData.name} onChange={handleInputChange} autoComplete="off" minlength="1" maxlength="80" required/>
                            </div>

                            <div class="row text-start">
                                <label for="type" class="mb-2 p-1">Tipo de ítem:</label>
                            </div>

                            <div class="row mb-5 text-start">
                                <div class="col w-100 p-3 border rounded">
                                    <div class="form-check mb-1">
                                        <input name="type" type="radio" class="form-check-input" id="music" value="música" onChange={handleInputChange} required/>
                                        <label for="music" class="form-check-label">Música</label>
                                    </div>
                                    <div class="form-check mb-1">
                                        <input name="type" type="radio" class="form-check-input" id="videogame" value="videojuego" onChange={handleInputChange} required/>
                                        <label for="videogame" class="form-check-label">Videojuego</label>
                                    </div>
                                    <div class="form-check mb-1">
                                        <input name="type" type="radio" class="form-check-input" id="movie" value="película" onChange={handleInputChange} required/>
                                        <label for="movie" class="form-check-label">Película</label>
                                    </div>
                                    <div class="form-check mb-1">
                                        <input name="type" type="radio" class="form-check-input" id="tv" value="serie" onChange={handleInputChange} required/>
                                        <label for="tv" class="form-check-label">Serie de TV</label>
                                    </div>
                                    <div class="form-check mb-1">
                                        <input name="type" type="radio" class="form-check-input" id="book" value="libro" onChange={handleInputChange} required/>
                                        <label for="book" class="form-check-label">Libro</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row m-5"></div>

                            <div class="row p-0 mb-5">
                                <div class="col-6 p-0 text-start">
                                    <a class="btn w-50 border border-1 border-dark rounded boton-volver text-dark" href={"/item?id=" + item_id}>Volver</a>
                                </div>
                                <div class="col-6 p-0 text-end">
                                    <button type="submit" class="btn w-50 bg-dark text-white">Añadir</button>
                                </div>                                
                            </div>
                        </form>

                        <br/><br/><br/>
                    </div>

                    <div class="col-lg-3 col-md-2"></div>
                </div>
            </main>
    );
};

export default AddRecommendation;