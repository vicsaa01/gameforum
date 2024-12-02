import React from "react";

import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import baseUrl from '../url'

const Recommendation = (props) => {
    const [cookies] = useCookies(['session']);
    const session = cookies['session'];
    
    // EXTRAER RECOMENDACIÓN DE LA BD

    const [recommendation, setRecommendation] = useState([]);
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/recommendation?id=' + props.id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setRecommendation(data);

                fetch(baseUrl + '/item?id=' + data.recommended_item)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setItem(data);
                });
            });
    }, [baseUrl + '/recommendation?id=' + props.id])

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
                fetch(baseUrl + '/not-like-recommendation?id=' + props.id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setRecommendation(data);

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
                fetch(baseUrl + '/like-recommendation?id=' + props.id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setRecommendation(data);

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
                fetch(baseUrl + '/not-dislike-recommendation?id=' + props.id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setRecommendation(data);

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
                fetch(baseUrl + '/dislike-recommendation?id=' + props.id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setRecommendation(data);

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
                                <div class="scrollable-card my-card w-100">
                                    <div class="card mb-1">
                                        <div class="card-body d-flex flex-row text-start">
                                            <div class="col-lg-3 col-md-4">
                                                <a class="btn m-0 p-0" href={"/item?id=" + item._id}><img src={'/img/' + item.icon} width="80" height="80"/></a>
                                            </div>
                                            <div class="col-lg-9 col-md-8">
                                                <a href={"/item?id=" + item._id}><h5 class="card-title m-0 p-0">{item.name}</h5></a>

                                                <div class="row mt-3">
                                                    <div class="col-lg-2 col-md-4 col-sm-6">
                                                        <p class="pt-1">{recommendation.likes} <button class="btn btn-outline-primary bg-white border-0 p-0 pb-1 ms-1" onClick={handleLike}><img src={'/img/' + interaction.like_icon} width="15" height="15"/></button></p>
                                                    </div>

                                                    <div class="col-lg-2 col-md-4 col-sm-6">
                                                        <p class="pt-1">{recommendation.dislikes} <button class="btn btn-outline-primary bg-white border-0 p-0 pb-1 ms-1" onClick={handleDislike}><img src={'/img/' + interaction.dislike_icon} width="15" height="15"/></button></p>
                                                    </div>

                                                    <div class="col-lg-8 col-md-4 col-sm-0"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    );
};

export default Recommendation;