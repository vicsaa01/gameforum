import React from "react";

const ItemDescription = (props) => {
    if (props.type == 'música') {
        return(<div class="col">
            <p>Artista: {props.creators}</p>
            <p>País: {props.country}</p>
            <p>Año de publicación: {props.year}</p>
            <p>Duración: {props.length}</p>
            <p>Géneros: {props.genres}</p>
            <p>Descripción: {props.info}</p>
        </div>);
    } else if (props.type == 'videojuego') {
        return(<div class="col">
            <p>Estudios de desarrollo: {props.producers}</p>
            <p>País: {props.country}</p>
            <p>Año de salida: {props.year}</p>
            <p>Plataformas: {props.platforms}</p>
            <p>Géneros: {props.genres}</p>
            <p>Descripción: {props.info}</p>
        </div>);
    } else if (props.type == 'película') {
        return(<div class="col">
            <p>Dirigida por: {props.creators}</p>
            <p>Producida por: {props.producers}</p>
            <p>País: {props.country}</p>
            <p>Año de estreno: {props.year}</p>
            <p>Duración: {props.length}</p>
            <p>Géneros: {props.genres}</p>
            <p>Descripción: {props.info}</p>
        </div>);
    } else if (props.type == 'serie') {
        return(<div class="col">
            <p>Dirigida por: {props.creators}</p>
            <p>Producida por: {props.producers}</p>
            <p>País: {props.country}</p>
            <p>Año de estreno: {props.year}</p>
            <p>Nº de temporadas: {props.length}</p>
            <p>Géneros: {props.genres}</p>
            <p>Descripción: {props.info}</p>
        </div>);
    } else if (props.type == 'libro') {
        return(<div class="col">
            <p>Autores: {props.creators}</p>
            <p>País de publicación: {props.country}</p>
            <p>Año de publicación: {props.year}</p>
            <p>Nº de páginas: {props.length}</p>
            <p>Géneros: {props.genres}</p>
            <p>Descripción: {props.info}</p>
        </div>);
    }
}

export default ItemDescription;