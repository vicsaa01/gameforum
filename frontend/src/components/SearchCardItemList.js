import React from "react";
import { useState, useEffect } from "react";

import SearchCardItem from "./SearchCardItem";

import baseUrl from '../url'

const SearchCardItemList = (props) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/search?string=' + props.search + '&orderby=' + props.orderby + '&filterby=' + props.filterby)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setItems(data);
          });
    }, [baseUrl + '/search?string=' + props.search + '&orderby=' + props.orderby + '&filterby=' + props.filterby])

    return(
                        <div class="scrollable-card-group my-cards">
                            {items.map((item) => (
                                <SearchCardItem id={item._id}/>
                            ))}
                        </div>
    );
};

export default SearchCardItemList;