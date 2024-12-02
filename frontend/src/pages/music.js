import React from "react";

import ItemCardList from "../components/ItemCardList"

const Music = () => {
    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-center text-dark">
                    <div class="col-12">
                        <h1>Música</h1>
                    </div>
                </div>

                <ItemCardList title="Últimos lanzamientos" type="music" criteria="newest" genre="all"/>
                <ItemCardList title="Más populares en electrónica" type="music" criteria="popular" genre="electrónica"/>
                <ItemCardList title="Más populares en rap" type="music" criteria="popular" genre="rap"/>
                <ItemCardList title="Más populares en jazz" type="music" criteria="popular" genre="jazz"/>
            </main>
    );
};

export default Music;