import React, {useState, useContext} from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from  "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

// import api from "../../apiConfig";

import { AuthContext } from "../../shared/context/auth-context"
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../util/validators";

import './Auth.css'

const Auth = () => {
    const authFormValue = {
        email: { value: '', isValid: false },
        password: { value: '', isValid: false}
    }

    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(authFormValue, false)
    const { isLoading, error, setError, sendReq } = useHttpClient();

    const submitFormHandler = async (event) => {
        event.preventDefault();
        let result;

        if(isLoginMode) {
            try {
                result = await sendReq('/users/login', 'post', {
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                })
                if(result) auth.login(result.user._id);
            } catch (err) {
             console.log(err);
            }
        } else {
            try {
                const formData = new FormData();
                formData.append('name', formState.inputs.name.value)
                formData.append('email', formState.inputs.email.value)
                formData.append('password', formState.inputs.password.value)
                formData.append('image', formState.inputs.image.value)
                result = await sendReq(`/users/signup`, 'post', formData)
                if(result) console.log('ok');
            } catch (error) {
                setError(error.data.message || 'Something Error');
            }
        }
    }

    const switchModeHandler = () => {
        if (!isLoginMode) { //sign in
            setFormData( {
                ...formState.inputs,
                name: undefined,
                image: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid )
        } else { // login
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    },
                    image: {
                        value: null,
                        isValid: false
                    }
                },
                false
            )
        }
        setIsLoginMode(isLoginMode => !isLoginMode)
    }

    const pageAction = (!isLoginMode)? 'Signup' : 'Login'

    const errorHandler = () => {
        setError(null)
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            <Card ClassName="authentication" onSumnit={submitFormHandler} >
                { isLoading && <LoadingSpinner asOverlay /> }
                <h2>{pageAction} Required</h2>
                <hr/>
                <form>
                    {!isLoginMode && <Input element="input" type="text" label="Your Name" id="name" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText="Please input Name" />}
                    {!isLoginMode &&
                        <ImageUpload id="image" center={true} onInput={inputHandler} errorText="Please upload JPG file." />
                    }
                    <Input element="input" type="email" label="E-mail" id="email" onInput={inputHandler} validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} errorText="Please input Email" />
                    <Input element="input" type="password" label="Password" id="password" onInput={inputHandler} validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(4)]} errorText="Please input at least 4 chr" />
                    <Button type="submit" onClick={submitFormHandler} disabled={!formState.isValid} >{pageAction}</Button>
                </form>
                    <Button inverse onClick={switchModeHandler} >Switch To {(isLoginMode)? 'Signup' : 'Login'} </Button>
            </Card>
        </React.Fragment>
    )
};

export default Auth;
