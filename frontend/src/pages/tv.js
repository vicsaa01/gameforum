import React from "react";

import ItemCardList from "../components/ItemCardList"

const TV = () => {
    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-center text-dark">
                    <div class="col-12">
                        <h1>TV</h1>
                    </div>
                </div>

                <ItemCardList title="Últimos lanzamientos" type="tv" criteria="newest" genre="all"/>
                <ItemCardList title="Más populares en acción" type="tv" criteria="popular" genre="acción"/>
                <ItemCardList title="Más populares en crimen" type="tv" criteria="popular" genre="crimen"/>
                <ItemCardList title="Más populares en comedia" type="tv" criteria="popular" genre="comedia"/>
            </main>
    );
};

export default TV;