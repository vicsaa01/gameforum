import React from "react";

import { useState, useEffect } from "react";

import Recommendation from "../components/Recommendation";

import baseUrl from '../url'

const Recommendations = (props) => {

    //EXTRAER COMENTARIOS DE LA BD

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/recommendations?item_id=' + props.id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setRecommendations(data);
            });
    }, [baseUrl + '/recommendations?item_id=' + props.id])

    return(
                        <div class="scrollable-card-group my-cards">
                            {recommendations.map((recommendation) => (
                                <Recommendation id={recommendation._id}
                                />
                            ))}
                        </div>
    )
}

export default Recommendations;