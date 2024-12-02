import React from "react";

import { useState } from "react";
import { useCookies } from 'react-cookie';

import baseUrl from '../url'

const InviteUser = () => {

    // get session and parameters

    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const session = cookies['session'];

    const queryParameters = new URLSearchParams(window.location.search)
    const user_id = queryParameters.get("user_id")

    // invite user

    const [formData, setFormData] = useState({
        user: '',
        group: '',
        sender: ''
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

        formData.user = user_id;
        formData.sender = session.user_id;

        console.log(formData);

        fetch(baseUrl + '/invite-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            if (data.hasOwnProperty('user')) {
                setFormData({
                    user: '',
                    group: '',
                    sender: ''
                });
                window.location.href = '/user?id=' + data.user;
            }
        })
        .catch((error) => {
            alert(error);
        });
    }

    return(
        <main class="m-5">
                <div class="row mb-3 text-center">
                    <div class="col-lg-3 col-md-4"></div>

                    <div class="col-lg-6 col-md-8">
                        <h3 class="mb-5 text-dark">Invitar al usuario a un grupo</h3>

                        <form onSubmit={handleSubmit}>
                            <div class="row mb-5 p-0 text-start">
                                <label for="group" class="mb-2 p-1">Nombre del grupo:</label>
                                <input name="group" type="text" class="form-control" value={formData.group} onChange={handleInputChange} autoComplete="off" minlength="1" maxlength="80" required/>
                            </div>

                            <div class="row m-5"></div>

                            <div class="row p-0 mb-5">
                                <div class="col-6 p-0 text-start">
                                    <a class="btn w-50 border border-1 border-dark rounded boton-volver text-dark" href={"/user?id=" + user_id}>Volver</a>
                                </div>
                                <div class="col-6 p-0 text-end">
                                    <button type="submit" class="btn w-50 bg-dark text-white">Invitar</button>
                                </div>                                
                            </div>
                        </form>

                        <br/><br/><br/>
                    </div>

                    <div class="col-lg-3 col-md-4"></div>
                </div>
            </main>
    );
};

export default InviteUser;