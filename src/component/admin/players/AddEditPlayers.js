import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import AdminLayout from "../../../hoc/AdminLayout";
import FormField from "../../../util/FormField";
import { firebaseDB, firebasePlayers, firebase } from "../../../firebase";
import { validate } from "../../../util/Misc";
import FileUploader from "../../../util/FileUploader";

class AddEditPlayers extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    isDownloading: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          type: "text",
          name: "Name_input",
          label: "First Name"
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          type: "text",
          name: "Last_Name_input",
          label: "Last Name"
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      number: {
        element: "input",
        value: "",
        config: {
          type: "number",
          name: "Number_input",
          label: "Number"
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "Select a position",
          type: "select",
          name: "Position",
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      image: {
        element: "image",
        value: "",
        valid: false,
        validation: {
          requirred: true
        }
      }
    }
  };

  updateFields = (data, id, type, defaultImg) => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      newFormData[key].value = data[key];
      newFormData[key].valid = true;
    }
    this.setState({
      formData: newFormData,
      playerId: id,
      formType: type,
      defaultImg
    });
  };

  componentDidMount() {
    const playerID = this.props.match.params.id; //from the route props
    if (!playerID) {
      this.setState({ formType: "Add Player" });
    } else {
      //
      firebaseDB
        .ref(`players/${playerID}`)
        .once("value")
        .then(snapshot => {
          const playersData = snapshot.val();
          this.setState({ isDownloading: true });
          //to get the image url
          firebase
            .storage()
            .ref("players")
            .child(playersData.image)
            .getDownloadURL()
            .then(url => {
              this.setState({ isDownloading: false });
              this.updateFields(playersData, playerID, "Edit Player", url);
            })
            .catch(e => {
              this.setState({ isDownloading: false });
              this.updateFields(
                { ...playersData, image: "" },
                playerID,
                "Edit Player"
              );
            });
        });
    }
  }

  changeField = (element, content = "") => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    let vaidData = validate(newElement);
    newElement.valid = vaidData[0];
    newElement.validationMessage = vaidData[1];

    newFormData[element.id] = newElement;
    this.setState({ formData: newFormData, formError: false });
  };

  formSuccessMsg(msg) {
    this.setState({ formSuccess: msg });
    setTimeout(() => {
      this.setState({ formSuccess: "" });
    }, 3000);
  }

  submitForm = event => {
    event.preventDefault();
    let submitData = {};
    let validForm = true;
    for (let key in this.state.formData) {
      submitData[key] = this.state.formData[key].value;
      validForm = this.state.formData[key].valid && validForm;
    }

    if (validForm) {
      if (this.state.formType === "Edit Player") {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(submitData)
          .then(() => {
            this.formSuccessMsg("Updated Successfully");
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        firebasePlayers
          .push(submitData)
          .then(() => {
            this.props.history.push("/players");
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({ formError: true });
    }
  };

  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData["image"].value = "";
    newFormData["image"].valid = false;
    this.setState({
      defaultImg: "",
      formData: newFormData
    });
  };

  storeFilename = filename => {
    this.changeField({ id: "image" }, filename);
  };

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <div className="admin_progress">
              {this.state.isDownloading ? (
                <CircularProgress thickness={7} style={{ color: "98c5e9" }} />
              ) : (
                ""
              )}
            </div>
            <form onSubmit={event => this.submitForm(event)}>
              <FileUploader
                dir="players"
                tag="Player Image"
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                reset={this.resetImage}
                filename={filename => this.storeFilename(filename)}
              />
              <FormField
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.changeField(element)}
              />
              <FormField
                id={"lastname"}
                formData={this.state.formData.lastname}
                change={element => this.changeField(element)}
              />
              <FormField
                id={"number"}
                formData={this.state.formData.number}
                change={element => this.changeField(element)}
              />
              <FormField
                id={"position"}
                formData={this.state.formData.position}
                change={element => this.changeField(element)}
              />
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Error submitting form</div>
              ) : null}
              <div className="admin_submit">
                <button>{this.state.formType}</button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayers;
