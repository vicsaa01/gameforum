import React, { useEffect, useState } from "react";

import UserMini from "./UserMini";
import baseUrl from '../url'

const UserMiniList = (props) => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/members?group_id=' + props.group_id)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setMembers(data);
        });
    }, [baseUrl + '/members?group_id=' + props.group_id])

    if (members.length == 0) {
        return(
            <p>Este grupo no tiene miembros</p>
        )
    } else {
        return(
            <div class="d-flex flex-row border border-1 rounded p-1 scrollable">
                {members.map((member) => (
                    <UserMini member_id={member._id}/>
                ))}
            </div>
        )
    }
}

export default UserMiniList;