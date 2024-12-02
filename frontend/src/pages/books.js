import React from "react";

import ItemCardList from "../components/ItemCardList"

const Books = () => {
    return(
        <main class="m-5">
                <div class="row mt-3 mb-4 text-center text-dark">
                    <div class="col-12">
                        <h1>Libros</h1>
                    </div>
                </div>

                <ItemCardList title="Últimos lanzamientos" type="books" criteria="newest" genre="all"/>
                <ItemCardList title="Más populares en fantasía" type="books" criteria="popular" genre="fantasía"/>
                <ItemCardList title="Más populares en no ficción" type="books" criteria="popular" genre="no ficción"/>
                <ItemCardList title="Más populares en terror" type="books" criteria="popular" genre="terror"/>
            </main>
    );
};

export default Books;