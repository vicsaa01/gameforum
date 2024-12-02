import React from "react";

import { useState, useEffect } from "react";

import GroupMenu from "../components/GroupMenu";
import DiscussionCards from "../components/DiscussionCards";
import UserMiniList from "../components/UserMiniList";
import ItemMiniList from "../components/ItemMiniList";
import baseUrl from '../url'

const Group = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")

    //EXTRAER GRUPO DE LA BD

    const [myGroup, setMyGroup] = useState([]);
    const [myUser, setMyUser] = useState([]);
    const [date, setDate] = useState({
        year: '',
        month: '',
        day: ''
    })

    useEffect(() => {
        fetch(baseUrl + '/group?id=' + id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.hasOwnProperty('message')) {
                alert(data.message);
                window.location.href = '/';
            } else {
                console.log(data);
                setMyGroup(data);
    
                fetch(baseUrl + '/user?id=' + data.creator_id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setMyUser(data);
                });
    
                let yyyy = data.created_at.substring(0,4);
                let mm = data.created_at.substring(5,7);
                switch(mm) {
                    case '01':
                        mm = 'enero';
                        break;
                    case '02':
                        mm = 'febrero';
                        break;
                    case '03':
                        mm = 'marzo';
                        break;
                    case '04':
                        mm = 'abril';
                        break;
                    case '05':
                        mm = 'mayo';
                        break;
                    case '06':
                        mm = 'junio';
                        break;
                    case '07':
                        mm = 'julio';
                        break;
                    case '08':
                        mm = 'agosto';
                        break;
                    case '09':
                        mm = 'septiembre';
                        break;
                    case '10':
                        mm = 'octubre';
                        break;
                    case '11':
                        mm = 'noviembre';
                        break;
                    case '12':
                        mm = 'diciembre';
                        break;
                    default:
                        mm = 'mes indefinido';
                        break;
                }
                let dd = data.created_at.substring(8,10);
                if (dd.substring(0,1) == '0') dd = dd.substring(1,2);
                setDate({
                    year: yyyy,
                    month: mm,
                    day: dd
                });
            }
          });
    }, [baseUrl + '/group?id=' + id])

    // sort discussions

    const [sort, setSort] = useState('popular');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSort(value);
    }

    return(
        <main class="m-5">
                <div class="row mt-3 mb-3 text-start text-dark">
                    <div class="col-12">
                        <h3>{myGroup.name}</h3>
                    </div>
                </div>

                <div class="row mb-3 align-items-center">
                    <GroupMenu id={myGroup._id} creator_id={myGroup.creator_id} username={myUser.name} date={date} group_type={myGroup.type}/>
                </div>

                <br/><br/><br/>

                <div class="row mb-5">

                    <div class="col-lg-7 col-md-12 m-0 mb-5 border border-dark border-1 rounded pt-3 pb-3">
                        <div class="row">
                            <div class="col">
                                <div class="row mb-4 text-left text-dark">
                                    <div class="col-6">
                                        <form>
                                            <div class="row align-items-center">
                                                <div class="col-lg-4 col-md-5 col-sm-6"><h5 class="me-5">Discusiones</h5></div>
                                                <div class="col-lg-8 col-md-7 col-sm-6">
                                                    <select class="form-select w-auto p-1 border border-1 border-dark" name="sortby" value={sort} onChange={handleInputChange} id="selectlist">
                                                        <option value="popular">Más populares</option>
                                                        <option value="new">Más recientes</option>
                                                        <option value="old">Más antiguas</option>
                                                        <option value="controversial">Más controvertidas</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    <div class="col-6 text-end">
                                        <a class="btn bg-dark text-white" href={"/create-discussion?group_id=" + myGroup._id}>+ Iniciar una discusión</a>
                                    </div>
                                </div>

                                <div class="row mb-5">
                                    <div class="col-12">
                                        <DiscussionCards id={myGroup._id} sortby={sort}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-1 col-md-0 d-none d-md-block"></div>

                    <div class="col-lg-4 col-md-12 m-0 pe-3 border border-dark border-1 rounded pt-3 pb-3">
                        <div class="row m-0 p-0">
                            <div class="col m-0 p-0">
                                <div class="row align-items-center">
                                    <div class="col"><h5 class="mb-1">Miembros ({myGroup.members})</h5></div>
                                </div>

                                <br/>

                                <UserMiniList group_id={myGroup._id}/>

                                <br/><br/><br/>

                                <div class="row align-items-center">
                                    <div class="col-6"><h5 class="mb-1">Ítems ({myGroup.items})</h5></div>
                                </div>

                                <br/>

                                <ItemMiniList group_id={myGroup._id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
    );
};

export default Group;