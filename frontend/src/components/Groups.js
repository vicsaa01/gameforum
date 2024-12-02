import React from "react";

import { useState, useEffect } from "react";

import GroupCard from "../components/GroupCard";
import baseUrl from "../url";

const Groups = () => {
    //EXTRAER GRUPOS DE LA BD
    const [groups, setGroups] = useState([])

    useEffect(() => {
        fetch(baseUrl + '/groups')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setGroups(data);
          });
    }, [baseUrl + '/groups'])

    return(
        <>
            <div class="row mt-3 mb-4 text-left">
                <div class="col-8"><h3>Explorar grupos</h3></div>

                <div class="col-4">
                    <div class="d-flex flex-row justify-content-end">
                        <a class="btn m-0 r-0 bg-dark text-white" href="/create-group">
                            + Crear nuevo grupo
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="row mb-5">
                    <div class="col-12">
                        <div class="scrollable-card-group groups">
                            {groups.map((group) => (
                                <GroupCard id={group._id} />
                            ))}
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Groups;