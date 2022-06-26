import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import { useForm } from "../../shared/hooks/form-hook";

import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import "./PlaceForm.css";
import { useHistory } from "react-router-dom";

const UpdatePlace = () => {
    const auth = useContext(AuthContext);

    const {isLoading, sendReq} = useHttpClient();

    const [identifiedPlace, setIdentifiedPlace] = useState();

    const placeId = useParams().placeId
    const history = useHistory()

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

    useEffect( ()=> {
        const getPlaceDetail = async () => {
            try {
                const responseData = await sendReq(`places/${placeId}`, 'get')
                if(responseData) {
                    setFormData({
                        title: {
                            value: responseData.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.description,
                            isValid: true
                        }
                    }, true);
                    setIdentifiedPlace(responseData)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPlaceDetail()
    } , [sendReq, placeId, setFormData])

    const updatePlaceDetail = async event => {
        event.preventDefault();
        console.log(formState);
        try {
            let result = await sendReq(`/places/${placeId}`, 'patch', {
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
            })
            if(result) history.push(`/${auth.userId}/places`);
        } catch (error) {
            console.log(error);
        }
    }

    if(!identifiedPlace) return <div className="center"><Card><h2>Could not find place!</h2></Card></div>
    if(isLoading) return <div>Loading</div>
    return (
        <form className="place-form" onSubmit={updatePlaceDetail}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input
                id="description"
                element="input"
                type="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min 5 characters)."
                onInput={inputHandler}
                value={identifiedPlace.description}
                valid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Update Place
            </Button>
        </form>
    )
};

export default UpdatePlace;
