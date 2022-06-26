import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import PlaceItem from './PlaceItem'
import Button from '../../shared/components/FormElements/Button'

import './PlaceList.css'

const PlaceList = props => {
    if(props.items.length === 0){
        return (
            <div className='place-list center'>
                <Card>
                    <h2>
                        No Place Found.
                    </h2>
                    {/* <button>Share Place</button> */}
                    <Button to='/places/new'>Add New</Button>
                </Card>
            </div>
        )
    }

    return (
        <ul className='place-list'>
            {
                props.items.map( (place, index) => (
                        <PlaceItem
                            key={index}
                            id={place._id}
                            image={place.image}
                            title={place.title}
                            description={place.description}
                            address={place.address}
                            creatorId={place.creator}
                            coordinates={place.location}
                        />
                ) )
            }
        </ul>
    )
}

export default PlaceList