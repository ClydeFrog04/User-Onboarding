import React from "react";

export default function Form(props) {
    return (
        <div className="formContainer">
            <form>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name={"name"}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name={"email"}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name={"password"}
                />
                <label htmlFor="tos">Terms of Service Agreement:</label>
                <input
                    type="checkbox"
                    name={"tos"}
                    value={"yes"}
                />
            </form>
        </div>
    );
}
/*
We want to create a form to onboard a new user to our system. We need at least the following pieces of information about our new user:
Name
Email
Password
Terms of Service (checkbox)
A Submit button to send our form data to the server.

 */

/*
<FormContainer className="formContainer">
            <FlexForm onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input
                    id={"name"}
                    type={"text"}
                    name={"name"}
                    value={formData.name}
                    onChange={handleChange}
                />
                <button type={"submit"}>Clicky to Submitty</button>
            </FlexForm>
        </FormContainer>
 */