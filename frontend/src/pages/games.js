import React from "react";

import ItemCardList from "../components/ItemCardList"

const Games = () => {
    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-center text-dark">
                    <div class="col-12">
                        <h1>Juegos</h1>
                    </div>
                </div>

                <ItemCardList title="Últimos lanzamientos" type="games" criteria="newest" genre="all"/>
                <ItemCardList title="Más populares en acción" type="games" criteria="popular" genre="acción"/>
                <ItemCardList title="Más populares en shooters" type="games" criteria="popular" genre="shooter"/>
                <ItemCardList title="Más populares en aventura" type="games" criteria="popular" genre="aventura"/>
                <ItemCardList title="Más populares en estrategia" type="games" criteria="popular" genre="estrategia"/>
                <ItemCardList title="Más populares en simuladores" type="games" criteria="popular" genre="simulador"/>
        </main>
    );
};

export default Games;