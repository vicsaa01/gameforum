import React, { useEffect, useState } from "react";

import ItemMini from "./ItemMini";
import baseUrl from '../url'

const ItemMiniList = (props) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/favorite-items?group_id=' + props.group_id)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setItems(data);
        });
    }, [baseUrl + '/favorite-items?group_id=' + props.group_id])

    if (items.length == 0) {
        return(
            <p>Este grupo no tiene ítems favoritos</p>
        )
    } else {
        return(
            <div class="d-flex flex-row border border-1 rounded p-1 scrollable">
                {items.map((item) => (
                    <ItemMini favorite_item_id={item._id}/>
                ))}
            </div>
        )
    }
}

export default ItemMiniList;