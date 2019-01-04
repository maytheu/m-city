import React, { Component } from "react";

import FormField from "../../util/FormField";
import { validate } from "../../util/Misc";
import { firebase } from "../../firebase";

class SignIn extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          type: "email",
          name: "email_input",
          placeholder: "Enter your email"
        },
        validation: {
          requirred: true,
          email: true
        },
        valid: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          type: "password",
          name: "password_input",
          placeholder: "Enter your password"
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: ""
      }
    }
  };

  changeField = element => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };
    newElement.value = element.event.target.value;

    let vaidData = validate(newElement);
    newElement.valid = vaidData[0];
    newElement.validationMessage = vaidData[1];

    newFormData[element.id] = newElement;
    this.setState({ formData: newFormData, formError: false });
  };

  submitForm = event => {
    event.preventDefault();
    let submitData = {};
    let validForm = true;
    for (let key in this.state.formData) {
      submitData[key] = this.state.formData[key].value;
      validForm = this.state.formData[key].valid && validForm;
    }
    if (validForm) {
      firebase
        .auth()
        .signInWithEmailAndPassword(submitData.email, submitData.password)
        .then(() => {
            this.props.history.push('/dashboard')
        })
        .catch(err => {
          this.setState({ formError: true });
        });
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{ margin: "100px" }}>
          <form onSubmit={event => this.submitForm(event)}>
            <h2>Please Login</h2>
            <FormField
              id={"email"}
              formData={this.state.formData.email}
              change={element => this.changeField(element)}
            />
            <FormField
              id={"password"}
              formData={this.state.formData.password}
              change={element => this.changeField(element)}
            />
            {this.state.formError ? (
              <div className="error_label">Incorrect email or password</div>
            ) : null}
            <button>Log in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
