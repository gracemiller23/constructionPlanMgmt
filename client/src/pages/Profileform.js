import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import Checkbox from "../Components/Subcomponents/FormElements/Checkbox";
import SelectInput from "../Components/Subcomponents/FormElements/SelectInput";
import SingleInput from "../Components/Subcomponents/FormElements/SingleInput";
import Dashboard from "../Components/Dashboard";
import Button from "../Components/Subcomponents/Button";

//figure out passing auth0id in
//add bootstrap form classes
class Profileform extends React.Component {
    state = {
            auth0Id: "",
            profileStage: "",
            companyName: "",
            companyAddress1: "",
            companyAddress2:"",
            companyCity:"",
            companyState:"",
            companyZip:"",
            firstName: "",
            lastName: "",
            contactPhone:"",
            contactEmail:"",
            contactEmail2:"",
            emailValid: "",
            tradeCategory:"Select",
            selectedAcknowledge:"",
            tradeCategories:["Earth Work", "Site Utilities", "Fuel System", "Fencing", "Landscaping", "Irrigation", "Concrete", "Masonry", "Structural and Misc. Steel", "Roofing", "Doors/Frames/Hardware", "Glass and Glazing", "EIFS/Simulated Stone"],
            statesUS:["Alaska",
            "Alabama",
            "Arkansas",
            "American Samoa",
            "Arizona",
            "California",
            "Colorado",
            "Connecticut",
            "District of Columbia",
            "Delaware",
            "Florida",
            "Georgia",
            "Guam",
            "Hawaii",
            "Iowa",
            "Idaho",
            "Illinois",
            "Indiana",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Massachusetts",
            "Maryland",
            "Maine",
            "Michigan",
            "Minnesota",
            "Missouri",
            "Mississippi",
            "Montana",
            "North Carolina",
            " North Dakota",
            "Nebraska",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "Nevada",
            "New York",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Puerto Rico",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Virginia",
            "Virgin Islands",
            "Vermont",
            "Washington",
            "Wisconsin",
            "West Virginia",
            "Wyoming"],
            acknowledgeOptions: ["I understand the terms of this account."]
      }

      handleInputChange = event => {
        const value = event.target.value;
        const title = event.target.name;
        this.setState({[title]: value})
      }

      handleEmailMatch = event => {
        const value = event.target.value;
        const title = event.target.name;

        if(value === this.state.contactEmail2){
        this.setState({emailValid: "invalid"})
        }
        this.setState({[title]: value})

      }
     componentDidMount(){
         console.log("in profile didMount");
         console.log(this.props.user.profile);
         console.log("in profile didMount");

     }

//add methods for form validation later
    
      postForm = event => {
        event.preventDefault();
        const formState = this.state;
        const data = {
            profileStage: "complete",
            companyName: formState.companyName,
            companyAddress1: formState.companyAddress1,
            companyAddress2: formState.companyAddress2,
            companyCity: formState.companyCity,
            companyState:formState.companyState,
            companyZip: formState.companyZip,
            contactName:{
                firstName: formState.firstName,
                lastName: formState.lastName,
            } ,
            contactPhone: formState.contactPhone,
            contactEmail: formState.contactEmail,
            tradeCategory: formState.tradeCategory,
            acknowledgeTerms: formState.selectedAcknowledge
        }
        
        const accessToken = this.props.user.auth.getAccessToken() || '';
        if (accessToken === ''){
            this.setState({ projects: [{_id:1, title: "Please log in to view projects"}]});
        } else{
        const url = "/api/profile/" + this.props.user.profile.auth0Id;
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        axios.post(url, data, {headers}).then(res =>{
            console.log(res);
            this.setState({
                companyName: "",
                companyAddress1: "",
                companyAddress2: "",
                companyCity: "",
                companyState:"",
                companyZip: "",
                firstName: "",
                lastName: "",
                contactPhone: "",
                contactEmail: "",
                tradeCategory: "",
                selectedAcknowledge:""
            });
            this.props.history.push("/subdashboard");
       });
   }
      }
//remove ) and - and . from phone numbers
render(){
    return (
        <div className="container-fluid">
        <Dashboard>
        <form>
            <SingleInput inputType="text" title="Company Name" name="companyName" controlFunc={this.handleInputChange} content={this.state.companyName} placeholder="Company Name"/>
            <SingleInput inputType="text" title="Company Address (line 1)" name="companyAddress1" controlFunc={this.handleInputChange} content={this.state.companyAddress1} placeholder="123 Ripple St."/>
            <SingleInput inputType="text" title="Company Address (line 2)" name="companyAddress2" controlFunc={this.handleInputChange} content={this.state.companyAddress2} placeholder="Suite ###"/>
            <SingleInput inputType="text" title="City" name="companyCity" controlFunc={this.handleInputChange} content={this.state.companyCity} placeholder="City"/>
            <SelectInput name="companyState" options={this.state.statesUS} selectedOption={this.state.companyState} controlFunc={this.handleInputChange} placeholder="State"/>
            <SingleInput inputType="number" title="Zip Code" name="companyZip" controlFunc={this.handleInputChange} content={this.state.companyZip} placeholder="Zip Code"/>
            <SingleInput inputType="text" title="Contact First Name" name="firstName" controlFunc={this.handleInputChange} content={this.state.firstName} placeholder="Contact First Name"/>
            <SingleInput inputType="text" title="Contact Last Name" name="lastName" controlFunc={this.handleInputChange} content={this.state.lastName} placeholder="Contact Last Name"/>
            <SingleInput inputType="number" title="Contact Phone Number (Numbers Only)" name="contactPhone" controlFunc={this.handleInputChange} content={this.state.contactPhone} placeholder="Phone Number"/>
            <SingleInput inputType="text" title="Contact Email" name="contactEmail2" controlFunc={this.handleInputChange} content={this.state.contactEmail2} placeholder="Email"/>
            <SingleInput inputType="text" title="Confirm Email" name="contactEmail" className={this.state.emailValid} controlFunc={this.handleEmailMatch} content={this.state.contactEmail} placeholder="Confirm Email"/>
            <SelectInput name="tradeCategory" options={this.state.tradeCategories} selectedOption={this.state.tradeCategory} controlFunc={this.handleInputChange} placeholder="Select a Category"/>
            <Button onClick={this.postForm} classNames="blue" text="Submit"/>
        </form>
        </Dashboard>
</div>

        )
    
}

}
//access the router info through this.props.history - use the push method to navigate somewhere new, 
//and use replace to switch to a new place, but come back to the same place if we hit the back button
export default withRouter(Profileform);
