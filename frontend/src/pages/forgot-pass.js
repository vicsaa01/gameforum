import React from "react";

import { useState } from "react";
import { Navigate } from "react-router-dom";

import baseUrl from '../url'

const ForgotPass = (props) => {

    props.setNav(false);


    //FORMULARIO

    const [formData, setFormData] = useState({
        name: '',
        email: ''
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

        fetch(baseUrl + '/reset-pass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
                alert(data.message);
                setFormData({
                    name: '',
                    email: ''
                });
        })
        .catch((error) => {
                alert(error);
        });
    }


    //IR AL LOGIN

    const [toLogin, setToLogin] = useState(false);

    const handleLogin = () => {
        setToLogin(true);
    }

    const ToLogin = () => {
        if (toLogin == true) {
            setToLogin(false);
            return <Navigate to="/login" state={{prevUrl: '/forgot-pass', has_id: false, id: ''}} />;
        }
    }


    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-center text-dark">
                    <div class="col-12">
                        <h1>Restablecer contraseña</h1>
                    </div>
                </div>
                
                <div class="row mb-5">
                    <div class="col-lg-4 col-md-2"></div>

                    <div class="col-lg-4 col-md-8">

                        <form onSubmit={handleSubmit}>
                            <label for="name" class="mt-3">Nombre de usuario</label>
                            <input type="text" class="form-control" name="name" value={formData.name} onChange={handleInputChange} required/>
                            
                            <label for="email" class="mt-3">Correo electrónico</label>
                            <input type="email" class="form-control" name="email" value={formData.email} onChange={handleInputChange} required/>
                            
                            <div class="row mt-5 mb-3">
                                <div class="col-6 text-start">
                                    <a class="btn w-100 border border-1 border-dark rounded boton-volver text-dark" href="/login" onClick={handleLogin}>Volver</a>
                                    <ToLogin/>
                                </div>
                                <div class="col text-end">
                                    <button type="submit" class="btn w-100 bg-dark text-white">Enviar correo</button>
                                </div>                                
                            </div>

                            <div class="row mt-5 text-center">
                                <div class="col">
                                    <a href="/login" onClick={handleLogin}>Iniciar sesión</a>
                                    <ToLogin/>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="col-lg-4 col-md-2"></div>
                </div>

                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </main>
    );
};

export default ForgotPass;