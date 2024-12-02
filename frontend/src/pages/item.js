import React from "react";

import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import ItemDescription from "../components/ItemDescription";
import ItemRating from "../components/ItemRating";
import ItemComments from "../components/ItemComments";
import Recommendations from "../components/Recommendations";
import ItemMenu from "../components/ItemMenu";

import baseUrl from '../url'

const Item = () => {

    // get parameters and session

    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")

    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const session = cookies['session'];

    // get ratings cookie

    const [ratingsCookie, setRatingsCookie, removeRatingsCookie] = useCookies(['ratings']);
    const ratings = ratingsCookie['ratings']

    var showStars = true;
    if (ratings != undefined) {
        ratings.forEach(r => {
            if (r.hasOwnProperty('item_id') && r.item_id == id) {
                showStars = false;
            }
        });
    }

    // ratings

    const [rating, setRating] = useState({
        points: 0
    });

    const handleSetRating = (e) => {
        const { name, value } = e.target;
        setRating({
            points: value*2
        });
    }

    const handleSubmitRating = (e) => {
        e.preventDefault();

        console.log(rating.points);

        fetch(baseUrl + '/rate-item?id=' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rating)
        })
        .then((response) => response.json())
        .then((data) => {
            setMyItem(data);
            let newRating = {
                item_id: id,
                points: rating.points
            };
            let ratings = ratingsCookie['ratings'];
            if (ratings != undefined && ratings.length > 0) ratings.push(newRating)
            else ratings = [newRating]
            setRatingsCookie('ratings', ratings, {path: '/'});
            window.location.href = '/item?id=' + id;
        })
        .catch((error) => {
            alert(error);
        });
    }

    // write comment

    const [formData, setFormData] = useState({
        text: '',
        item: '',
        user: ''
    });

    const handleWriteComment = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmitComment = (e) => {
        e.preventDefault();

        formData.item = id;
        if (session != undefined) {formData.user = session.user_id;}
        else {formData.user = 'anonymous'}

        console.log(formData);

        fetch(baseUrl + '/add-item-comment', {
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
                item: '',
                user: ''
            });
            window.location.href = '/item?id=' + id;
        })
        .catch((error) => {
            alert(error);
        });
    }

    // sort comments

    const [sort, setSort] = useState('popular')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSort(value);
    }

    //EXTRAER ÍTEM DE LA BD

    const [myItem, setMyItem] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/item?id=' + id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.hasOwnProperty('message')) {
                alert(data.message);
                window.location.href = '/';
            } else {
                console.log(data);
                setMyItem(data);
            }
          });
    }, [baseUrl + '/item?id=' + id])

    // share
    
    const handleShare = () => {
        alert('La opción de compartir estará disponible en una versión futura')
    }

    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-center text-dark">
                    <div class="col-12">
                        <h3>{myItem.name}</h3>
                    </div>
                </div>
                
                <div class="row mb-5">
                    <div class="col pt-3 pb-3 border border-dark rounded">
                        <div class="row">
                            <div class="col-lg-3 col-md-4">
                                <img src={"../img/" + myItem.icon} class="rounded" width="200" height="200"/>
                            </div>
                            <div class="col-lg-6 col-md-4">
                                <div class="row">
                                    <ItemDescription
                                        type={myItem.type}
                                        creators={myItem.creators}
                                        producers={myItem.producers}
                                        country={myItem.country}
                                        year={myItem.year}
                                        length={myItem.length}
                                        platforms={myItem.platforms}
                                        genres={myItem.genres}
                                        info={myItem.info}
                                    />
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4">
                                <div class="row">
                                    <div class="col">
                                        <ItemMenu id={id}/>
                                    </div>
                                </div>

                                <div class="row mt-3">

                                    <div class="col">
                                        <a class="btn rounded w-100 bg-white text-dark boton-volver border border-dark border-1 float-right" onClick={handleShare}>
                                            <img src='/img/share.png' width='25' height='30' alt="share"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row font-weight-bold">
                            <div class="col-lg-4 col-md-5 mt-5">
                                <h4>Valoración media:</h4>
                                <ItemRating points={myItem.points} ratings={myItem.ratings}/>
                            </div>

                            

                            {showStars && (<>
                                <div class="border border-dark mt-5"></div>

                                <div class="col-lg-7 col-md-6 mt-5">
                                    <h4>Valora este ítem: </h4>

                                    <div class="row">
                                        <form onSubmit={handleSubmitRating}>
                                            <div class="col rate me-5">
                                                <input type="radio" id="star5" name="rate" value="5" onClick={handleSetRating}/>
                                                <label for="star5" title="text">5 stars</label>
                                                <input type="radio" id="star4" name="rate" value="4" onClick={handleSetRating}/>
                                                <label for="star4" title="text">4 stars</label>
                                                <input type="radio" id="star3" name="rate" value="3" onClick={handleSetRating}/>
                                                <label for="star3" title="text">3 stars</label>
                                                <input type="radio" id="star2" name="rate" value="2" onClick={handleSetRating}/>
                                                <label for="star2" title="text">2 stars</label>
                                                <input type="radio" id="star1" name="rate" value="1" onClick={handleSetRating}/>
                                                <label for="star1" title="text">1 star</label>
                                            </div>

                                            <div class="col">
                                                <button type="submit" class="btn border border-1 border-dark rounded boton-volver text-dark mt-1">Valorar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>)}
                        </div>
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col mb-5 text-center">
                        <div class="row">
                            <h4>Comentarios</h4>

                            <form onSubmit={handleSubmitComment}>
                                <div class="row mt-3">
                                    <div class="col">
                                        <textarea name="text" value={formData.text} onChange={handleWriteComment} class="form-control" placeholder="Añade un comentario..."></textarea>
                                    </div>
                                </div>

                                <div class="row mt-1 mb-3">
                                    <div class="col">
                                        <button type="submit" class="rounded p-1 bg-dark text-white float-end">Publicar</button>
                                    </div>
                                </div>
                            </form>
                            
                                <div class="row align-items-center mt-3 mb-3">
                                    <div class="col-lg-2 col-md-4 col-sm-6 text-start">
                                        <br/>
                                        <p class="mt-3">Ordenar por:</p>
                                    </div>

                                    <div class="col-lg-10 col-md-8 col-sm-6">
                                        <select class="form-select w-auto p-1 mt-3 ml-3 border border-1 border-dark" name="sortby" onChange={handleInputChange}>
                                            <option value="popular">Más populares</option>
                                            <option value="old">Más antiguos</option>
                                            <option value="new">Más recientes</option>
                                            <option value="controversial">Más controvertidos</option>
                                        </select>
                                    </div>
                                </div>

                            <ItemComments id={myItem._id} sortby={sort}/>
                        </div>
                    </div>

                    <div class="col-1"></div>

                    <div class="col text-center">
                        <div class="row">
                            <h4>Recomendaciones</h4>

                            <div class="row mt-3 mb-3">
                                    <div class="col">
                                        <a class="btn w-100 border border-1 border-dark rounded boton-volver text-dark" href={"/add-recommendation?item_id=" + myItem._id}>+ Añade una recomendación</a>
                                    </div>
                            </div>

                            <Recommendations id={myItem._id}/>
                        </div>
                    </div>
                </div>
            </main>
    );
};

export default Item;