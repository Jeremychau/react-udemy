import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Byulding',
        description: 'One of the most famous sky scrapers in the world',
        imageUrl: 'https://post-phinf.pstatic.net/MjAyMjA0MTRfODIg/MDAxNjQ5OTI2NzM0Mzg3.nMl28FCPDIu1SQE5mUGUQQEI7hXS2n7OAVkc78UJHj8g.cb9ULN9Q-i0nz6ifaWXCfusozlHnYKDwwH-KtuJ-RRgg.JPEG/3.jpg?type=w1200',
        address: 'Myeong-dong',
        location: {
            lat: 37.5615682,
            lng: 126.9733249
        },
        creator: 'u1'
    },
    {
        id: 'p1',
        title: 'Empire State Byulding',
        description: 'One of the most famous sky scrapers in the world',
        imageUrl: 'https://post-phinf.pstatic.net/MjAyMjA0MTRfODIg/MDAxNjQ5OTI2NzM0Mzg3.nMl28FCPDIu1SQE5mUGUQQEI7hXS2n7OAVkc78UJHj8g.cb9ULN9Q-i0nz6ifaWXCfusozlHnYKDwwH-KtuJ-RRgg.JPEG/3.jpg?type=w1200',
        address: 'Myeong-dong',
        location: {
            lat: 37.5615682,
            lng: 126.9733249
        },
        creator: 'u3'
    },
]

const UserPlaces = () => {

    const userId = useParams().userId;

    const loadedPlaces = DUMMY_PLACES.filter( place => place.creator === userId );

    return (
        <PlaceList items={loadedPlaces} />
    )
}

export default UserPlaces