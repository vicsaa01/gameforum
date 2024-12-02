import React from "react";
import { useState, useEffect } from "react";

import baseUrl from '../url'

import SearchCardList from "./SearchCardList";

const SearchCardListList = (props) => {

    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/search?string=' + props.search + '&orderby=' + props.orderby + '&filterby=' + props.filterby)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setLists(data);
          });
    }, [baseUrl + '/search?string=' + props.search + '&orderby=' + props.orderby + '&filterby=' + props.filterby])

    return(
                        <div class="scrollable-card-group my-cards">
                            {lists.map((list) => (
                                <SearchCardList id={list._id}/>
                            ))}
                        </div>
    );
};

export default SearchCardListList;