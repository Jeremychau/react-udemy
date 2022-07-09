import React, {useContext} from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceForm.css";

const NewPlace = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendReq, clearError } = useHttpClient();

    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            },
            image: {
                value: null,
                isValid: false
            }
        }, false
    )

    const history = useHistory()

    const placeSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            console.log(auth.token);
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value)
            formData.append('description', formState.inputs.description.value)
            formData.append('address', formState.inputs.address.value)
            // formData.append('creator', auth.userId)
            formData.append('image', formState.inputs.image.value)
            let result = await sendReq('/places', 'post', formData, auth.token)
            if(result) history.push('/');
        } catch (err) {}
    }

	return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter valid Title"
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    element="input"
                    type="textarea"
                    label="Description"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter valid Description (at least 5 characters)"
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="input"
                    type="text"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter valid Address"
                    onInput={inputHandler}
                />
                <ImageUpload id="image" onInput={inputHandler} errorText="Please provide image for place" />
                <Button type="submit" disabled={!formState.isValid} >
                    Add Place
                </Button>
            </form>
        </React.Fragment>
	);
};

export default NewPlace;
