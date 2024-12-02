import React from "react";

import ItemCardList from "../components/ItemCardList"

const Movies = () => {
    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-center text-dark">
                    <div class="col-12">
                        <h1>Cine</h1>
                    </div>
                </div>

                <ItemCardList title="Últimos lanzamientos" type="movies" criteria="newest" genre="all"/>
                <ItemCardList title="Más populares en acción" type="movies" criteria="popular" genre="acción"/>
                <ItemCardList title="Más populares en aventura" type="movies" criteria="popular" genre="aventura"/>
                <ItemCardList title="Más populares en comedia" type="movies" criteria="popular" genre="comedia"/>
                <ItemCardList title="Más populares en romance" type="movies" criteria="popular" genre="romance"/>
            </main>
    );
};

export default Movies;