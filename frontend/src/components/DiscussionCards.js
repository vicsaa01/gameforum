import React from "react";

import { useState, useEffect } from "react";

import DiscussionCard from "./DiscussionCard";
import baseUrl from '../url'

const DiscussionCards = (props) => {

    console.log('Sorting discussions by: ' + props.sortby);

    //EXTRAER DISCUSIONES DE LA BD
    
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/' + props.sortby + '-discussions?group_id=' + props.id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setDiscussions(data);
          });
    }, [baseUrl + '/' + props.sortby + '-discussions?group_id=' + props.id])

    return(
                                <div class="scrollable-card-group my-cards">
                                    {discussions.map((discussion) => (
                                        <DiscussionCard id={discussion._id}/>
                                    ))}
                                </div>
    );
};

export default DiscussionCards;