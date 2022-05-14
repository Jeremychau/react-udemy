import React, {useState, useContext} from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from  "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import { AuthContext } from "../../shared/context/auth-context"

import { useForm } from "../../shared/hooks/form-hook";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../util/validators";

import './Auth.css'

const Auth = () => {
    const auth = useContext(AuthContext);

    const authFormValue = {
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
    }

    const [isLoginMode, serIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm(authFormValue, false)

    const submitFormHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    const switchModeHandler = () => {
        if (!isLoginMode) { //sign in
            setFormData( {
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid )
        } else { // login
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                },
                false
            )
        }
        serIsLoginMode(prevMode => !prevMode)
    }

    const pageAction = (!isLoginMode)? 'Signup' : 'Login'

    return (
        <Card ClassName="authentication" onSumnit={submitFormHandler} >
            <h2>{pageAction} Required</h2>
            <hr/>
            <form action="">
                {!isLoginMode && <Input element="input" type="text" label="Your Name" id="name" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText="Please input Name" />}
                <Input element="input" type="email" label="E-mail" id="email" onInput={inputHandler} validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} errorText="Please input Email" />
                <Input element="input" type="password" label="Password" id="password" onInput={inputHandler} validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(4)]} errorText="Please input at least 4 chr" />
                <Button type="submit" onClick={submitFormHandler} disabled={!formState.isValid} >{pageAction}</Button>
            </form>
            <Button inverse onClick={switchModeHandler} >Switch To {(isLoginMode)? 'Signup' : 'Login'} </Button>
        </Card>
    )
};

export default Auth;
