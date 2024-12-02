import React from "react";

import { useState, useEffect } from "react";

import baseUrl from '../url'

const UserMini = (props) => {

    //EXTRAER DE LA BD

    const [member, setMember] = useState([]);
    const [myUser, setMyUser] = useState([]);

    useEffect(() => {
        fetch(baseUrl + '/member?id=' + props.member_id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setMember(data);

            fetch(baseUrl + '/user?id=' + data.user_id)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
              setMyUser(data);
            });
          });
    }, [baseUrl + '/member?id=' + props.member_id])

    return(
        <a class="btn m-0 mr-3 p-0 scrolled" href={"/user?id=" + myUser._id}><img src={"/img/" + myUser.avatar} width="80" height="80"/></a>
    );
};

export default UserMini;