import React, { Component } from "react";

import AdminLayout from "../../../hoc/AdminLayout";
import FormField from "../../../util/FormField";
import { firebaseDB, firebaseTeams, firebaseMatches } from "../../../firebase";
import { validate } from "../../../util/Misc";
import { firebaseLooper } from "../../../util/MiscMatches";

class AddEditMatches extends Component {
  state = {
    matchId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    teams: [],
    formData: {
      date: {
        element: "input",
        value: "",
        config: {
          type: "date",
          name: "date_input",
          label: "Event date"
        }, 
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      local: {
        element: "select",
        value: "",
        config: {
          type: "select",
          name: "local_teams",
          options: []
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: ""
      },
      resultLocal: {
        element: "input",
        value: "",
        config: {
          type: "number",
          name: "result_local",
          label: "Local Result"
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      away: {
        element: "select",
        value: "",
        config: {
          type: "select",
          name: "away_teams",
          options: []
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: ""
      },
      resultAway: {
        element: "input",
        value: "",
        config: {
          type: "number",
          name: "result_away",
          label: "Away Result"
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      referee: {
        element: "input",
        value: "",
        config: {
          type: "text",
          name: "referee_input",
          label: "Referee"
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          type: "text",
          name: "stadium_input",
          label: "Stadium"
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      result: {
        element: "select",
        value: "",
        config: {
          type: "select",
          name: "result",
          label: "Team result",
          options: [
            { key: "W", value: "W" },
            { key: "L", value: "L" },
            { key: "D", value: "D" },
            { key: "N/a", value: "N/a" }
          ]
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      final: {
        element: "select",
        value: "",
        config: {
          type: "select",
          name: "FINAL",
          label: "game played",
          options: [{ key: "Yes", value: "Yes" }, { key: "No", value: "No" }]
        },
        validation: {
          requirred: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };

  componentDidMount() {
    const matchID = this.props.match.params.id; //from the route props

    const getTeams = (match, type) => {
      firebaseTeams.once("value").then(snapshot => {
        const teams = firebaseLooper(snapshot);
        const teamOption = [];
        snapshot.forEach(childSnapshot => {
          teamOption.push({
            key: childSnapshot.val().shortName,
            value: childSnapshot.val().shortName
          });
        });
        this.updateMatchField(match, teamOption, teams, type, matchID);
      });
    };

    if (!matchID) {
      //add match
      getTeams(false, "Add Match");
    } else {
      //edit match
      firebaseDB
        .ref(`matches/${matchID}`)
        .once("value")
        .then(snapshot => {
          const match = snapshot.val();
          getTeams(match, "Edit Match");
        });
    }
  }

  updateMatchField(match, teamOption, teams, type, matchID) {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      if (match) {
        //updating the value of input from id component
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }
      //for the select
      if (key === "local" || key === "away") {
        newFormData[key].config.options = teamOption;
      }
    }
    this.setState({
      matchId: matchID,
      formData: newFormData,
      formType: type,
      teams
    });
  }

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
    //submit the thumbnail data to the database
    this.state.teams.forEach(team => {
      if (team.shortName === submitData.local) {
        submitData["localThmb"] = team.thmb;
      }
      if (team.shortName === submitData.away) {
        submitData["awayThmb"] = team.thmb;
      }
    });
    if (validForm) {
      if (this.state.formType === "Edit Match") {
        firebaseDB
          .ref(`matches/${this.state.matchId}`)
          .update(submitData)
          .then(() => {
            this.formSuccessMsg("Updated Successfully");
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        //new form
        firebaseMatches
          .push(submitData)
          .then(() => {
            this.props.history.push("/matches");
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <form onSubmit={event => this.submitForm(event)}>
            <FormField
              id={"date"}
              formData={this.state.formData.date}
              change={element => this.changeField(element)}
            />
            <div className="select_team_layout">
              <div className="label_inputs">Local</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={"local"}
                    formData={this.state.formData.local}
                    change={element => this.changeField(element)}
                  />
                </div>
                <div>
                  <FormField
                    id={"resultLocal"}
                    formData={this.state.formData.resultLocal}
                    change={element => this.changeField(element)}
                  />
                </div>
              </div>
            </div>
            <div className="select_team_layout">
              <div className="label_inputs">Away</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={"away"}
                    formData={this.state.formData.away}
                    change={element => this.changeField(element)}
                  />
                </div>
                <div>
                  <FormField
                    id={"resultAway"}
                    formData={this.state.formData.resultAway}
                    change={element => this.changeField(element)}
                  />
                </div>
              </div>
            </div>
            <div className="spilt_fields">
              <FormField
                id={"referee"}
                formData={this.state.formData.referee}
                change={element => this.changeField(element)}
              />

              <FormField
                id={"stadium"}
                formData={this.state.formData.stadium}
                change={element => this.changeField(element)}
              />
            </div>
            <div className="spilt_fields last">
              <FormField
                id={"result"}
                formData={this.state.formData.result}
                change={element => this.changeField(element)}
              />
              <FormField
                id={"final"}
                formData={this.state.formData.final}
                change={element => this.changeField(element)}
              />
            </div>
            <div className="success_label">{this.state.formSuccess}</div>
            {this.state.formError ? (
              <div className="error_label">Error submitting form</div>
            ) : null}
            <div className="admin_submit">
              <button>{this.state.formType}</button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditMatches;
