import React from "react";

import { useState } from "react";

import baseUrl from "../url";

const UserEdit = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")
    const name = queryParameters.get("name")
    const info = queryParameters.get("info")

    const [formData, setFormData] = useState({
        name: name,
        info: info
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const [image, setImage] = useState({
        preview: '',
        raw: ''
    });

    const handleImageChange = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // formData.avatar = iamge.raw
        console.log(formData);

        alert('La opción de cambiar avatar estará disponible en una versión futura (esta imagen no se procesará)')

        // para subir imagen, cambiar content-type a multipart/form y enviar el formdata tal cual
        fetch('http://127.0.0.1:8000/edit-user?id=' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.modified == 1) {
                alert('Se ha actualizado el perfil de usuario');
                setFormData({
                    name: '',
                    info: ''
                });
                window.location.href = '/user?id=' + id;
            } else {
                alert('No se ha podido actualizar el perfil de usuario. Comprueba que los valores son distintos a los anteriores.')
            }
        })
        .catch((error) => {
            alert(error);
        });
    }

    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-center text-dark">
                    <div class="col-12">
                        <h3>Editar perfil</h3>
                    </div>
                </div>
                
                <div class="row mb-5">
                    <div class="col-3"></div>

                    <div class="col-6">
                        <div class="row">
                            {(image.preview != '') && (
                                <div class="col">
                                    <img src={image.preview} class="rounded float-end" width="200" height="200"/>
                                </div>
                            )}
                            
                            <div class="col">
                                <input type="file" name="myImage" onChange={handleImageChange}/>
                            </div>

                            <div class="col">
                                {(image.preview != '') && (<button onClick={() => setImage({preview: '', raw: ''})}>Quitar</button>)}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label for="name" class="mt-5">Nombre de usuario</label>
                            <input type="text" class="form-control" name="name" value={formData.name} onChange={handleInputChange}/>

                            <label for="info" class="mt-3">Descripción</label>
                            <textarea name="info" class="form-control w-100" placeholder="Añade una descripción..." value={formData.info} onChange={handleInputChange}></textarea>
                            
                            <div class="row mt-5 mb-4">
                                <div class="col-6 text-start">
                                    <a class="btn w-50 border border-1 border-dark rounded boton-volver text-dark" href={"/user?id=" + id}>Volver</a>
                                </div>
                                <div class="col-6 text-end">
                                    <button type="submit" class="btn w-50 bg-dark text-white">Guardar cambios</button>
                                </div>                                
                            </div>
                        </form>
                    </div>

                    <div class="col-3"></div>
                </div>
            </main>
    );
};

export default UserEdit;