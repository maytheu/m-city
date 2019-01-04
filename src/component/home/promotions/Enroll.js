import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import FormField from "../../../util/FormField";
import { validate } from "../../../util/Misc";
import { firebasePromotions } from "../../../firebase";

class Enroll extends Component {
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

  resetFormSuccess = status => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      newFormData[key].value = "";
      newFormData[key].valid = false;
      newFormData[key].validationMessage = "";
    }
    this.setState({
      formError: false,
      formData: newFormData,
      formSuccess: status ? "Congratulations" : "Already on the database"
    });
    setTimeout(() => {
      this.setState({ formSuccess: "" });
    }, 3000);
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
      firebasePromotions
        .orderByChild("email")
        .equalTo(submitData.email)
        .once("value")
        .then(snapshot => {
          if (snapshot.val() === null) {
            firebasePromotions.push(submitData);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={event => this.submitForm(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField
                id={"email"}
                formData={this.state.formData.email}
                change={element => this.changeField(element)}
              />
            </div>
            {this.state.formError ? (
              <div className="error_label">Something went wrong, try again</div>
            ) : null}
            <div className="success_label">{this.state.formSuccess}</div>
            <button>Enroll</button>
            <div className="enroll_dicl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
