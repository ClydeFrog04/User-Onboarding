import React, {useState} from "react";
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";
import prependDeep from "yup/lib/util/prependDeep";

//setup some styles
const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 300px;
    margin: 0 auto;
}
`;
const ErrP = styled.p`
    color: red;
`;

//setup form schema
const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Email address is invalid").required("Must be a valid email address"),//todo: why the .email.required
    password: yup.string().required("Password is a required field"),//todo: check if there is a .password()
    tos: yup.boolean().oneOf([true], "You must agree to our terms of service")
});

export default function Form(props) {
    //set state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",//varbad. No store password this way.
        tos: false
    });
    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        tos: "",
    });
    const [users, setUsers] = useState([]);

    //validate user input
    function validate(event){
        yup.reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid =>{
                setErrorState({
                    ...errorState,
                    [event.target.name]: ""
                });
            })
            .catch(err =>{
                console.log(err.errors);
                setErrorState({
                    ...errorState,
                    [event.target.name]: err.errors[0]//todo:getting a warning about this being null/und?
                });
            });
    }


    function formSubmit(event) {
        //todo: might be worth validating here and in handle change. What if the user never types anything? can't they still post then?
        event.preventDefault();
        console.log("form submitted successfully~");
        axios.post("https://reqres.in/api/users", formData)
            .then(response => {
                console.log(response);
                //<pre>{JSON.stringify(post, null, 2)}</pre>
                props.setUsers([...props.users, JSON.stringify(response.data, null, 2)]);
            })
            .catch(err => console.log(err));
    }

    function handleChange(event) {
        event.persist();//this just has to be here
        validate(event);
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setFormData({...formData, [event.target.name] : value});
    }

    return (
        <FormContainer className="formContainer">
            <StyledForm onSubmit={formSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}

                />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name={"email"}
                    id={"email"}
                    value={formData.email}
                    onChange={handleChange}
                />
                {errorState.email.length > 0 ? (
                    <ErrP className="error">{errorState.email}</ErrP>
                ) : null}
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name={"password"}
                    id={"password"}
                    value={formData.password}
                    onChange={handleChange}
                />
                <label htmlFor="tos">Terms of Service Agreement:</label>
                <input
                    type="checkbox"
                    name={"tos"}
                    id={"tos"}
                    checked={formData.tos}
                    onChange={handleChange}
                />
                <button onSubmit={formSubmit}>Submit</button>
            </StyledForm>
        </FormContainer>
    );
}