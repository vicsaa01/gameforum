import React from "react";

import { useState, useEffect } from "react";

import SearchCardDiscussion from "./SearchCardDiscussion";

import baseUrl from '../url'

const SearchCardDiscussionList = (props) => {

    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/search?string=' + props.search + '&orderby=' + props.orderby + '&filterby=' + props.filterby)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setDiscussions(data);
          });
    }, [baseUrl + '/search?string=' + props.search + '&orderby=' + props.orderby + '&filterby=' + props.filterby])

    return(
                        <div class="scrollable-card-group my-cards">
                            {discussions.map((discussion) => (
                                <SearchCardDiscussion id={discussion._id}/>
                            ))}
                        </div>
    );
};

export default SearchCardDiscussionList;