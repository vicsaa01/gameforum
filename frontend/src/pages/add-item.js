import React from "react";

import { useState } from "react";

import baseUrl from "../url";

const AddItem = () => {

    const [formData, setFormData] = useState({
        name: '',
        info: '',
        type: '',
        genres: '',
        creators: '',
        producers: '',
        country: '',
        year: 0,
        length: '',
        platforms: ''
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

        fetch(baseUrl + '/add-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
            alert('Se ha añadido el ítem');
            window.location.href = '/item?id=' + data._id;
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
                        <h3 class="mb-5 text-dark">Añadir un ítem nuevo</h3>

                        <form onSubmit={handleSubmit}>
                            <div class="row mb-5 p-0 text-start">
                                <label for="name" class="mb-2 p-1">Nombre:</label>
                                <input name="name" type="text" class="form-control" value={formData.name} onChange={handleInputChange} autoComplete="off" minlength="1" maxlength="80" required/>
                            </div>

                            <div class="row mb-5 p-0 text-start">
                                <label for="info" class="mb-2 p-1">Descripción:</label>
                                <textarea name="info" class="form-control" value={formData.info} onChange={handleInputChange} required/>
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

                            <div class="row mb-5 p-0 text-start">
                                <label for="genres" class="mb-2 p-1">Género:</label>
                                <input name="genres" type="text" class="form-control" value={formData.genres} onChange={handleInputChange} autoComplete="off" required/>
                            </div>

                            <div class="row mb-5 p-0 text-start">
                                <label for="creators" class="mb-2 p-1">Creadores (artistas musicales/directores de cine/directores de TV/autores):</label>
                                <input name="creators" type="text" class="form-control" value={formData.creators} onChange={handleInputChange} autoComplete="off"/>
                            </div>

                            <div class="row mb-5 p-0 text-start">
                                <label for="producers" class="mb-2 p-1">Productores (desarrolladoras de videojuegos/productores de cine/productores de TV):</label>
                                <input name="producers" type="text" class="form-control" value={formData.producers} onChange={handleInputChange} autoComplete="off"/>
                            </div>

                            <div class="row mb-5 p-0 text-start">
                                <label for="year" class="mb-2 p-1">Año de publicación:</label>
                                <input name="year" type="number" class="form-control" value={formData.year} onChange={handleInputChange} required/>
                            </div>

                            <div class="row mb-5 p-0 text-start">
                                <label for="country" class="mb-2 p-1">País de origen:</label>
                                <input name="country" type="text" class="form-control" value={formData.country} onChange={handleInputChange} autoComplete="off" required/>
                            </div>

                            <div class="row mb-5 p-0 text-start">
                                <label for="length" class="mb-2 p-1">Duración (en horas/en minutos/nº de temporadas/nº de páginas):</label>
                                <input name="length" type="text" class="form-control" value={formData.length} onChange={handleInputChange} autoComplete="off"/>
                            </div>

                            <div class="row mb-5 p-0 text-start">
                                <label for="platforms" class="mb-2 p-1">Plataformas (si es videojuego, ej. PC):</label>
                                <input name="platforms" type="text" class="form-control" value={formData.platforms} onChange={handleInputChange} autoComplete="off"/>
                            </div>

                            <div class="row m-5"></div>

                            <div class="row p-0 mb-5">
                                <div class="col-6 p-0 text-start">
                                    <a class="btn w-50 border border-1 border-dark rounded boton-volver text-dark" href="/">Volver</a>
                                </div>
                                <div class="col-6 p-0 text-end">
                                    <button type="submit" class="btn w-50 bg-dark text-white">Añadir ítem</button>
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

export default AddItem;