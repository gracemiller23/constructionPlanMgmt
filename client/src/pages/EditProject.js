import React from "react";

import {withRouter} from "react-router-dom";
import { UserConsumer } from '../UserContext';

import Dashboard from '../Components/Dashboard';
import ProjectForm from "../Components/ProjectForm";




class EditProject extends React.Component {
    //add match.path to determine if user is editing or creating, then ajax load in subcomponent if editing
    //later utilize to allow admins to edit profiles   
    //import user context so that later when more components are added for admin editing, info is easier to access 
render(){
    return (
        <div className="container-fluid">
            <Dashboard>
            <div className="row">
                <div className="col centertxt">
                <h3>Project Details</h3>
                </div>
                </div>
                <div className="row">
                <div className="col">
                <UserConsumer>
                    {prov => (
                        <ProjectForm user={prov.state}/>

                    )}
                    </UserConsumer>

                </div>
                </div>
            </Dashboard>
        </div>

        )
    
}

}
//access the router info through this.props.history - use the push method to navigate somewhere new, 
//and use replace to switch to a new place, but come back to the same place if we hit the back button
export default withRouter(EditProject);
