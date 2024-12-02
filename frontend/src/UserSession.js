import { useCookies } from 'react-cookie';

const UserSession = () => {

    var user_id = '';
    var access_token = '';

    const [cookies, setCookie] = useCookies(['session']);

    const getSession = () => {
        return {
            user_id: user_id,
            access_token: access_token
        }
    }

    const setSession = (user, token) => {
        user_id = user;
        access_token = token;

        let session = {
            user_id: user,
            access_token: token
        };
        setCookie('session', session, {path: '/'});
        // setCookie('session', session, {path: '/', expires});
    }

    const removeSession = () => {
        // remove cookie
    }

    return {
        getSession: getSession,
        setSession: setSession,
        removeSession: removeSession
    }
}

export default UserSession;