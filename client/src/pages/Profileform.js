import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import Checkbox from "../Components/Subcomponents/FormElements/Checkbox";
import SelectInput from "../Components/Subcomponents/FormElements/SelectInput";
import SingleInput from "../Components/Subcomponents/FormElements/SingleInput";

class Profileform extends React.Component {
    state = {
            auth0Id: "",
            profileStage: "",
            companyName: "",
            companyAddress1: "",
            companyAddress2:"",
            companyCity:"",
            companyState:"",
            companyZip:00000,
            contactName:{
                firstName: "",
                lastName: ""},
            contactPhone:0000000000,
            contactEmail:"",
            tradeCategory:"Select",
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
            "Wyoming"]
      }

      handleInputChange = event => {
        const value = event.target.value;
        const title = event.target.name;
        this.setState({[title]: value})
      }
    
      postForm = event => {
        event.preventDefault();
        const {title, body} = this.state;
        const { getAccessToken } = this.props.auth;
        const accessToken = localStorage.getItem('access_token') || '';
        if (accessToken === ''){
            this.setState({ projects: [{_id:1, title: "Please log in to view projects"}]});
        } else{
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        axios.post("/api/test", {title,body}, {headers}).then(res =>{
          console.log(res);
          this.setState({title: "", body:""});
          //uses react-router-dom's history method "push" to send the user to the designated route
          this.props.history.push("/");
        });
    }
      }
//remove ) and - and . from phone numbers
render(){
    return (
        <div className="container-fluid">
        <form>
           
        </form>
</div>

        )
    
}

}
//access the router info through this.props.history - use the push method to navigate somewhere new, 
//and use replace to switch to a new place, but come back to the same place if we hit the back button
export default withRouter(Profileform);
