import React from "react";
import { useState, useEffect } from "react";

import baseUrl from '../url'

const SearchCardDiscussion = (props) => {
    //EXTRAER DE LA BD
    const [myDiscussion, setMyDiscussion] = useState([])

    useEffect(() => {
        fetch(baseUrl + '/discussion?id='+props.id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setMyDiscussion(data);
          });
    }, [baseUrl + '/discussion?id='+props.id])
    
    return(
                            <div class="scrollable-card my-card w-100">
                                <div class="card mb-1">
                                    <div class="card-body d-flex flex-row text-left">
                                        <div class="col-lg-10 col-md-9">
                                            <a href={"/discussion?id=" + props.id}>
                                                <h5 class="card-title m-0 p-0">{myDiscussion.title}</h5>
                                            </a>
                                            <p class="mt-4">Tags: {myDiscussion.tags}</p>
                                            <p>Likes: {myDiscussion.likes}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
    );
};

export default SearchCardDiscussion;