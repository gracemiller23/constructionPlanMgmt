import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

//import Checkbox from "../Components/Subcomponents/FormElements/Checkbox";
import SelectInput from "../Components/Subcomponents/FormElements/SelectInput";
import SingleInput from "../Components/Subcomponents/FormElements/SingleInput";
import Button from "../Components/Subcomponents/Button";
import Checkbox from "../Components/Subcomponents/FormElements/Checkbox";

//figure out passing auth0id in
//add bootstrap form classes
class SubProfileform extends React.Component {
    state = {
        projectName: "",
        projectLocation: "",
        subcontractors: [],
        invitedSubcontractors: []
    }

    handleInputChange = event => {
        const value = event.target.value;
        const title = event.target.name;
        this.setState({ [title]: value })
    }

    handleSelectSubcontractors = event => {
        const newSelection = event.target.value;
        let newSelectionArray;

        if (this.state.invitedSubcontractors.indexOf(newSelection) > -1) {
            newSelectionArray = this.state.invitedSubcontractors.filter(s => s !== newSelection)
        } else {
            newSelectionArray = [...this.state.invitedSubcontractors, newSelection];
        }

        this.setState({ invitedSubcontractors: newSelectionArray });
    }

    componentWillMount() {

        const accessToken = this.props.user.auth.getAccessToken() || '';
        if (accessToken === '') { return } else {
            const headers = { 'Authorization': `Bearer ${accessToken}` }
            axios.get("/api/subcontractors", { headers }).then(res => {
                console.log(res);
                this.setState({
                    subcontractors: res.data
                });
                console.log("in component did mount of form");
                console.log(this.state.subcontractors);
                console.log("in component did mount of form");

            });
        }
    }

    //add methods for form validation later

    postForm = event => {
        event.preventDefault();
        const formState = this.state;
        const data = {
            projectName: formState.projectName,
            projectLocation: formState.projectLocation,
            invitedSubcontractors: formState.invitedSubcontractors
        }
        const accessToken = this.props.user.auth.getAccessToken() || '';
        if (!accessToken === '') {
            const headers = { 'Authorization': `Bearer ${accessToken}` }
            axios.post("/api/project", data, { headers }).then(res => {
                console.log(res);
                this.setState({
                    projectName: "",
                    projectLocation: "",
                    invitedSubcontractors: []
                });
                // this.props.history.push("/subdashboard");
            });
        }
    }
    //remove ) and - and . from phone numbers
    render() {
        return (

            <form>
                <SingleInput inputType="text" title="Project Name" name="projectName" controlFunc={this.handleInputChange} content={this.state.projectName} placeholder="Project Name" />
                <SingleInput inputType="text" title="Project Location" name="projectLocation" controlFunc={this.handleInputChange} content={this.state.projectLocation} placeholder="123 Ripple St., Austin, TX 78733" />
                <Checkbox
                    title={'Select Subcontractors to Invite to Bidding'}
                    setName={'invitedSubcontractors'}
                    type={'checkbox'}
                    controlFunc={this.handleSelectSubcontractors}
                    options={this.state.subcontractors}
                    selectedOptions={this.state.invitedSubcontractors} />
            </form>

        )

    }

}
//access the router info through this.props.history - use the push method to navigate somewhere new, 
//and use replace to switch to a new place, but come back to the same place if we hit the back button
export default withRouter(SubProfileform);
