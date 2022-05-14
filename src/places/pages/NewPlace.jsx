import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const NewPlace = () => {
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
            }
        }, false
    )

    const placeSubmitHandler = event => event.preventDefault();

	return (
		<form className="place-form" onSubmit={placeSubmitHandler}>
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
            <Button type="submit" disabled={!formState.isValid} >
                Add Place
            </Button>
		</form>
	);
};

export default NewPlace;
