import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';

// import api from "../../apiConfig";

const Users = () => {
    const [loadedUsers, setLoadedUsers] = useState([])

    const { isLoading, error, setError, sendReq } = useHttpClient();

    useEffect(() => {
        const getUser = async() => {
            try {
                let result = await sendReq('/users', 'get', '')
                setLoadedUsers(result)
            } catch (err) {
                setError(err.message || 'Something Error');
            }
        }
        getUser()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={ () => setError(null)} />
            { isLoading && <div className='center'>
                <LoadingSpinner/>
            </div> }
            { !isLoading && loadedUsers && <UsersList items={loadedUsers} /> }
        </React.Fragment>
    )
}

export default Users
