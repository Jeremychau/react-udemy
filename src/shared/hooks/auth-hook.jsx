import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [userId, serUserId] = useState(false);

    const login = useCallback((uid, token) => {
        setToken(token);
        serUserId(uid);
        // let date = expiration || new Date(new Date() + 1000 * 60 );
        localStorage.setItem('userData', JSON.stringify({userId: uid, token}))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        serUserId(null)
    }, []);

    useEffect(() => {
        const userItem = JSON.parse(localStorage.getItem('userData'));
        // let verifyDate = (userItem && new Date (userItem.expiration) > new Date())? true : false
        if(userItem && userItem.token && userItem.userId ) login(userItem.userId, userItem.token);
    }, [login])

    return { token, userId, login, logout }
}