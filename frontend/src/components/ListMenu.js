import React from "react";

import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import baseUrl from "../url";

const ListMenu = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const session = cookies['session'];

    //EXTRAER LISTA DE LA BD
    const [list, setList] = useState();
    const [date, setDate] = useState({
        year: '',
        month: '',
        day: ''
    });

    useEffect(() => {
        fetch(baseUrl + '/list?id=' + props.id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setList(data);

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
          });
    }, [baseUrl + '/list?id=' + props.id])

    var type = '';
    if (list != undefined && list.type == 'encuesta') type = 'Encuesta';
    else type = 'Lista';

    if ((session != undefined && list != undefined) && session.user_id == list.creator_id) {
        return(
            <>
                    <div class="col-6">
                        <p>{type} creada por tí el {date.day} de {date.month} de {date.year}</p>
                    </div>
                    <div class="col-6 text-end">
                        <a class="btn bg-dark text-white" href={"/edit-list?id=" + list._id}>Editar lista</a>
                    </div>
            </>
        );
    } else if (list != undefined) {
        return(
            <>
                    <div class="col-12">
                        <p>{type} creada por <a href={"/user?id=" + list.creator_id}>{props.username}</a> el {date.day} de {date.month} de {date.year}</p>
                    </div>
            </>
        );
    } else {
        return(
            <>
                    <div class="col-12">
                        <p>{type} creada por usuario indefinido el {date.day} de {date.month} de {date.year}</p>
                    </div>
            </>
        )
    }
}

export default ListMenu;