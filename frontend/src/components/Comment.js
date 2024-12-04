import React from "react";

import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import baseUrl from '../url'

const Comment = (props) => {

    const [cookies] = useCookies(['session']);
    const session = cookies['session'];

    const [comment, setComment] = useState([]);
    const [myUser, setMyUser] = useState([]);
    const [anon, setAnon] = useState(true);

    const [dateTime, setDateTime] = useState({
        year: '',
        month: '',
        day: '',
        time: ''
    });

    useEffect(() => {
        fetch(baseUrl + '/comment?id=' + props.id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setComment(data);

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

                if (data.user != 'anonymous') {
                    fetch(baseUrl + '/user?id=' + data.user)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        setMyUser(data);
                        setAnon(false);
                    });
                } else {
                    setAnon(true);
                }
            });
    }, [baseUrl + '/comment?id=' + props.id])

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
                fetch(baseUrl + '/not-like-comment?id=' + props.id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setComment(data);

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
                fetch(baseUrl + '/like-comment?id=' + props.id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setComment(data);

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
                fetch(baseUrl + '/not-dislike-comment?id=' + props.id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setComment(data);

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
                fetch(baseUrl + '/dislike-comment?id=' + props.id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setComment(data);

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

    if (!anon) {
        return(
                            <div class="scrollable-card-group my-cards">
                                <div class="scrollable-card my-card w-100 mb-3">
                                    <div class="card">
                                        <div class="card-body d-flex flex-row text-start">
                                            <div class="col-lg-1 col-md-2 col-sm-3">
                                                <div class="row align-items-center">
                                                    <a class="btn m-0 p-0" href={"/user?id=" + myUser._id}><img class="rounded-circle" src={'/img/' + myUser.avatar} width="80" height="80"/></a>
                                                </div>
                                                
                                            </div>

                                            <div class="col-lg-10 col-md-9 col-sm-8">
                                                <div class="row ms-3">
                                                    <a href={"/user?id=" + myUser._id}><h5 class="mr-3">{myUser.name}</h5></a>
                                                    <p>{dateTime.day}/{dateTime.month}/{dateTime.year} {dateTime.time}</p>
                                                </div>

                                                <div class="row ms-3 text-justify">
                                                    <p>{comment.text}</p>
                                                </div>

                                                <div class="row ms-3">
                                                    <div class="col-lg-2 col-md-4 col-sm-6">
                                                        <div class="row">
                                                            <p class="pt-1">{comment.likes} <button class="btn btn-outline-primary bg-white border-0 p-0 pb-1 ms-1" onClick={handleLike}><img src={'/img/' + interaction.like_icon} width="15" height="15"/></button></p>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-2 col-md-4 col-sm-6">
                                                        <div class="row">
                                                            <p class="pt-1">{comment.dislikes} <button class="btn btn-outline-primary bg-white border-0 p-0 pb-1 ms-1" onClick={handleDislike}><img src={'/img/' + interaction.dislike_icon} width="15" height="15"/></button></p>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-8 col-md-4 col-sm-0"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        );
    } else {
        return(
            <div class="scrollable-card-group my-cards">
                <div class="scrollable-card my-card w-100 mb-3">
                    <div class="card">
                        <div class="card-body d-flex flex-row text-start">
                            <div class="col-lg-1 col-md-2 col-sm-3">
                                <div class="row align-items-center">
                                    <a class="btn m-0 p-0" href=""><img class="rounded-circle" src='/img/default-user-avatar.png' width="80" height="80"/></a>
                                </div>
                                
                            </div>

                            <div class="col-lg-10 col-md-9 col-sm-8">
                                <div class="row ms-3">
                                    <h5 class="mr-3">Anónimo</h5>
                                    <p>{dateTime.day}/{dateTime.month}/{dateTime.year} {dateTime.time}</p>
                                </div>

                                <div class="row ms-3 text-justify">
                                    <p>{comment.text}</p>
                                </div>

                                <div class="row ms-3">
                                                    <div class="col-lg-2 col-md-4 col-sm-6">
                                                        <div class="row">
                                                            <p class="pt-1">{comment.likes} <button class="btn btn-outline-primary bg-white border-0 p-0 pb-1 ms-1" onClick={handleLike}><img src={'/img/' + interaction.like_icon} width="15" height="15"/></button></p>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-2 col-md-4 col-sm-6">
                                                        <div class="row">
                                                            <p class="pt-1">{comment.dislikes} <button class="btn btn-outline-primary bg-white border-0 p-0 pb-1 ms-1" onClick={handleDislike}><img src={'/img/' + interaction.dislike_icon} width="15" height="15"/></button></p>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-8 col-md-4 col-sm-0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Comment;