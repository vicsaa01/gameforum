import React from "react";

import { useCookies } from 'react-cookie';

const UserMenu = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const session = cookies['session'];

    const handleLogout = () => {
        removeCookie('session');
    }

    const handleInvite = () => {
    }

    if (session != undefined && session.user_id == props.id) {
        return(
            <>
                <div class="col-12">
                    <div class="row"><a class="btn bg-dark text-white rounded" href={"/edit-user?id=" + props.id + "&name=" + props.name + "&info=" + props.info}>Editar perfil</a></div>
                    <div class="row"><a class="btn bg-white text-dark boton-volver border border-dark rounded mt-3" href={"/invites?user_id=" + props.id}>Invitaciones</a></div>
                    <div class="row"><a class="btn bg-white text-dark boton-volver border border-dark rounded mt-3" href="/" onClick={handleLogout}>Cerrar sesión</a></div>
                </div>
            </>
        );
    } else {
        return(
            <>
                <a class="btn bg-dark text-white rounded text-right" href={"/invite-user?user_id=" + props.id}>+ Invitar a un grupo</a>
            </>
        );
    }
}

export default UserMenu;