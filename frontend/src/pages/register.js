import React from "react";

import { useState } from "react";
import { Navigate } from "react-router-dom";

import baseUrl from '../url'

const Register = (props) => {

    props.setNav(false);


    // FORMULARIO

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pass: '',
        pass2: ''
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

            if (formData.pass == formData.pass2) {
                fetch(baseUrl + '/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.hasOwnProperty('message')) {
                        alert(data.message);
                    } else {
                        alert('Se ha registrado el usuario');
                        setToLogin(true);
                    }
                })
                .catch((error) => {
                    alert(error);
                });
            } else {
                alert('Se debe repetir la misma contraseña');
            }
    }


    //IR AL LOGIN

    const [toLogin, setToLogin] = useState(false);

    const handleLogin = () => {
        setToLogin(true);
    }

    const ToLogin = () => {
        if (toLogin == true) {
            setToLogin(false);
            return <Navigate to="/login" state={{prevUrl: '/register', has_id: false, id: ''}} />;
        }
    }


    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-center text-dark">
                    <div class="col-12">
                        <h1>Registro</h1>
                    </div>
                </div>
                
                <div class="row mb-5">
                    <div class="col-lg-4 col-md-2"></div>

                    <div class="col-lg-4 col-md-8">

                        <form onSubmit={handleSubmit}>
                            <label for="name" class="mt-3">Nombre de usuario:</label>
                            <input type="text" class="form-control" name="name" value={formData.name} onChange={handleInputChange} autoComplete="off" minlength="1" maxlength="30" required/>
                            
                            <label for="email" class="mt-3">Correo electrónico:</label>
                            <input type="email" class="form-control" name="email" value={formData.email} onChange={handleInputChange} autoComplete="off" minlength="1" maxlength="30" required/>

                            <label for="pass" class="mt-5">Contraseña:</label>
                            <input type="password" class="form-control" name="pass" value={formData.pass} onChange={handleInputChange} autoComplete="off" minlength="8" maxlength="50" required/>

                            <label for="pass2" class="mt-3">Repetir contraseña:</label>
                            <input type="password" class="form-control" name="pass2" value={formData.pass2} onChange={handleInputChange} autoComplete="off" minlength="8" maxlength="50" required/>
                            
                            <div class="row mt-5 mb-3">
                                <div class="col-6 text-start">
                                    <a class="btn w-100 border border-1 border-dark rounded boton-volver text-dark" href="" onClick={handleLogin}>Volver</a>
                                    <ToLogin/>
                                </div>
                                <div class="col text-end">
                                    <button type="submit" class="btn w-100 bg-dark text-white">Registrarse</button>
                                </div>                                
                            </div>

                            <div class="row mt-5 text-center">
                                <div class="col">
                                    <a href="" onClick={handleLogin}>Ya tengo una cuenta</a>
                                    <ToLogin/>
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

export default Register;