import React from "react";

import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import DiscussionComments from "../components/DiscussionComments";
import baseUrl from '../url'

const Discussion = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")

    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const session = cookies['session'];

    const [formData, setFormData] = useState({
        text: '',
        discussion: '',
        user: ''
    });

    const handleWriteComment = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        formData.discussion = id;
        if (session != undefined) {formData.user = session.user_id;}
        else {formData.user = 'anonymous'}

        console.log(formData);

        fetch(baseUrl + '/add-discussion-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
            setFormData({
                text: '',
                discussion: '',
                user: ''
            });
            window.location.href = '/discussion?id=' + id;
        })
        .catch((error) => {
            alert(error);
        });
    }

    const [sort, setSort] = useState('popular')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSort(value);
    }

    //EXTRAER DISCUSIÓN DE LA BD

    const [myDiscussion, setMyDiscussion] = useState([]);
    const [myGroup, setMyGroup] = useState([]);
    const [myUser, setMyUser] = useState([]);

    const [dateTime, setDateTime] = useState({
        year: '',
        month: '',
        day: '',
        time: ''
    });

    useEffect(() => {
        fetch(baseUrl + '/discussion?id=' + id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.hasOwnProperty('message')) {
                alert(data.message);
                window.location.href = '/';
            } else {
                console.log(data);
                setMyDiscussion(data);
    
                let yyyy = data.created_at.substring(0,4);
                let mm = data.created_at.substring(5,7);
                let dd = data.created_at.substring(8,10);
                let t = data.created_at.substring(11,16);
                setDateTime({
                    year: yyyy,
                    month: mm,
                    day: dd,
                    time: t
                });
    
                fetch(baseUrl + '/group?id=' + data.group_id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setMyGroup(data);
                });
    
                fetch(baseUrl + '/user?id=' + data.creator_id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setMyUser(data);
                });
            }
          });
    }, [baseUrl + '/discussion?id=' + id])

    // likes y dislikes

    const [interaction, setInteraction] = useState({
        liked: false,
        like_icon: 'like.png',
        disliked: false,
        dislike_icon: 'dislike.png'
    });

    const handleLike = () => {
        if (!interaction.disliked && session!=undefined) {
            if (interaction.liked) {
                fetch(baseUrl + '/not-like-discussion?id=' + id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setMyDiscussion(data);

                    setInteraction((prev) => ({
                        ...prev,
                        liked: false,
                        like_icon: 'like.png'
                    }));
                })
                .catch((error) => {
                    alert(error);
                });
            } else {
                fetch(baseUrl + '/like-discussion?id=' + id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setMyDiscussion(data);

                    setInteraction((prev) => ({
                        ...prev,
                        liked: true,
                        like_icon: 'liked.png'
                    }));
                })
                .catch((error) => {
                    alert(error);
                });
            }
            console.log(interaction);
        }
    }

    const handleDislike = () => {
        if (!interaction.liked && session!=undefined) {
            if (interaction.disliked) {
                fetch(baseUrl + '/not-dislike-discussion?id=' + id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setMyDiscussion(data);

                    setInteraction((prev) => ({
                        ...prev,
                        disliked: false,
                        dislike_icon: 'dislike.png'
                    }));
                })
                .catch((error) => {
                    alert(error);
                });
            } else {
                fetch(baseUrl + '/dislike-discussion?id=' + id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setMyDiscussion(data);

                    setInteraction((prev) => ({
                        ...prev,
                        disliked: true,
                        dislike_icon: 'disliked.png'
                    }));
                })
                .catch((error) => {
                    alert(error);
                });
            }
            console.log(interaction);
        }
    }

    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-left text-dark">
                    <div class="col-12 ps-5 pe-5">
                        <h3>{myDiscussion.title}</h3>
                    </div>
                </div>

                <div class="row mb-4 text-left text-dark">
                    <div class="col-12 ps-5 pe-5">
                        <p>Discusión de <a href={"/group?id=" + myGroup._id}>{myGroup.name}</a></p>
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-11 ps-5 pe-5">
                    <div class="scrollable-card-group my-cards">
                            <div class="scrollable-card my-card w-100 mb-3">
                                <div class="card">
                                    <div class="card-body d-flex flex-row text-start">
                                        <div class="col-lg-1 col-md-2 col-sm-3">
                                            <div class="row align-items-center">
                                                <a class="btn m-0 p-0" href={"/user?id=" + myDiscussion.creator_id}><img class="rounded-circle" src={'/img/' + myUser.avatar} width="80" height="80"/></a>
                                            </div>
                                            
                                        </div>

                                        <div class="col-lg-10 col-md-9 col-sm-8">
                                            <div class="row ms-3">
                                                <a href={"/user?id=" + myDiscussion.creator_id}><h5 class="mr-3">{myUser.name}</h5></a>
                                                <p>{dateTime.day}/{dateTime.month}/{dateTime.year} {dateTime.time}</p>
                                            </div>

                                            <div class="row ms-3 text-justify">
                                                <p>{myDiscussion.text}</p>
                                            </div>

                                            <div class="row ms-3">
                                                <div class="col-lg-2 col-md-4 col-sm-6">
                                                    <div class="row">
                                                        <p class="pt-1">{myDiscussion.likes} <button class="btn btn-outline-primary bg-white border-0 p-0 pb-1 ms-1" onClick={handleLike}><img src={'/img/' + interaction.like_icon} width="15" height="15"/></button></p>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-4 col-sm-6">
                                                    <div class="row">
                                                        <p class="pt-1 me-1">{myDiscussion.dislikes} <button class="btn btn-outline-primary bg-white border-0 p-0 pb-1 ms-1" onClick={handleDislike}><img src={'/img/' + interaction.dislike_icon} width="15" height="15"/></button></p>
                                                    </div>
                                                </div>

                                                <div class="col-lg-8 col-md-4 col-sm-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-1"></div>
                </div>

                <div class="row mt-3">
                    <div class="col-1"></div>

                    <div class="col-11">
                        <h5 class="m-3 ps-4 pe-5">Respuestas</h5>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div class="row mt-3">
                        <div class="col-1"></div>

                        <div class="col-11 ps-5 pe-5">
                            <textarea name="text" value={formData.text} onChange={handleWriteComment} class="form-control w-100" placeholder="Añade un comentario..."></textarea>
                        </div>
                    </div>

                    <div class="row mt-1 mb-3">
                        <div class="col-1"></div>

                        <div class="col ps-5 pe-5">
                            <button type="submit" class="rounded p-1 bg-dark text-white float-start">Publicar</button>
                        </div>
                    </div>
                </form>

                <div class="row mb-4 text-left text-dark">
                    <div class="col-1"></div>

                    <div class="col-11 ps-5 pe-5">
                        <br/>
                        <div class="row align-items-center">
                            <div class="col-2"><p class="m-3">Ordenar por</p></div>
                            <div class="col-10">
                                <select class="form-select w-auto p-1 border border-1 border-dark" name="sortby" value={sort} onChange={handleInputChange}>
                                    <option value="popular">Más populares</option>
                                    <option value="old">Más antiguas</option>
                                    <option value="new">Más recientes</option>
                                    <option value="controversial">Más controvertidas</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-1"></div>

                    <DiscussionComments id={myDiscussion._id} sortby={sort}/>
                </div>
            </main>
    );
};

export default Discussion;