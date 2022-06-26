import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttpClient } from '../../shared/hooks/http-hook'

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const {isLoading, error, sendReq, clearError} = useHttpClient();
    const userId = useParams().userId;

    useEffect(() => {
        const getPlaces = async() => {
            try {
                const result = await sendReq(`places/user/${userId}`)
                setLoadedPlaces(result.places)
            } catch (error) {
                console.log(error);
            }
        }
        getPlaces();
    }, [sendReq, userId])


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading &&  <div className='center'><LoadingSpinner asOverlay/></div>}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
        </React.Fragment>
    )
}

export default UserPlaces