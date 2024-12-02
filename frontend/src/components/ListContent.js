import React from "react";

import { useState, useEffect } from "react";

import PollElement from "../components/PollElement";
import UnorderedElement from "../components/UnorderedElement";

import baseUrl from "../url";

const ListContent = (props) => {

    // EXTRAER ELEMENTOS DE LA BD

    const [elements, setElements] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/list-elements?id=' + props.id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setElements(data);
          });
    }, [baseUrl + '/list-elements?id=' + props.id])

    // ranks

    var rank = 1;

    if (elements.length == 0) {
        return(
            <div class='row text-center'>
                <p>Esta lista está vacía, navega a la página de un ítem y pulsa en <i>Añadir a lista</i> para incluir ese ítem en la lista.</p>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        )
    } else {
        if (props.type == 'encuesta') {
            return(
                <div class="scrollable-card-group my-cards">
                    {elements.map((element) => (
                        <PollElement id={element._id} position={rank++}/>
                    ))}
                </div>
            )
        } else {
            return(
                <div class="scrollable-card-group my-cards">
                    {elements.map((element) => (
                        <UnorderedElement id={element._id} position={rank++} list_id={props.id} creator_id={props.creator_id}/>
                    ))}
                </div>
            )
        }
    }
}

export default ListContent;