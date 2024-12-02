import React from "react";

const ItemRating = (props) => {
    if (props.ratings < 1) {
        return(<h3 class="rounded w-50 text-center valoracion-inexistente">Sin puntuación</h3>);
    }

    var rating = Math.round(props.points*10/props.ratings);
    console.log(rating);
    
    if (rating < 50) {
        return(<h3 class="rounded w-25 text-center valoracion-negativa">{rating}/100</h3>);
    } else if (rating < 70) {
        return(<h3 class="rounded w-25 text-center valoracion-mixta">{rating}/100</h3>);
    } else if (rating < 90) {
        return(<h3 class="rounded w-25 text-center valoracion-positiva">{rating}/100</h3>);
    } else if (rating <= 100) {
        return(<h3 class="rounded w-25 text-center valoracion-muy-positiva">{rating}/100</h3>);
    } else {
        return(<h3 class="rounded w-25 text-center valoracion-inexistente">(!) Error</h3>);
    }
}

export default ItemRating;