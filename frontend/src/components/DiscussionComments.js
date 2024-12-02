import React from "react";

import { useState, useEffect } from "react";

import Comment from "../components/Comment";
import baseUrl from '../url'

const DiscussionComments = (props) => {

    console.log('Sorting comments by: ' + props.sortby);

    //EXTRAER COMENTARIOS DE LA BD

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/' + props.sortby + '-discussion-comments?discussion_id=' + props.id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setComments(data);
            });
    }, [baseUrl + '/' + props.sortby + '-discussion-comments?discussion_id=' + props.id])

    return(
                    <div class="col-11 ps-5 pe-5">
                        {comments.map((comment) => (
                            <Comment id={comment._id}
                            />
                        ))}
                    </div>
    )
}

export default DiscussionComments;