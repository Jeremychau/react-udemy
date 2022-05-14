import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import "./PlaceForm.css";

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

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)

    const identifiedPlace = DUMMY_PLACES.find( item => item.id === placeId);

    useEffect( () => {
        if(identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true);
        }

        setIsLoading(false);
    }, [setFormData, identifiedPlace])


    const placeSubmitHandler = event => event.preventDefault();

    if(!identifiedPlace) return <div className="center"><Card><h2>Could not find place!</h2></Card></div>

    if(isLoading){
        return <div>Loading</div>
    }

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                value={formState.inputs.title.value}
                valid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="input"
                type="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min 5 characters)."
                onInput={inputHandler}
                value={formState.inputs.description.value}
                valid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid} >
                Update Place
            </Button>
        </form>
    )
};

export default UpdatePlace;
