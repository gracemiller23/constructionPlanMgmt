import React from "react";
import axios from "axios";

import SideTabLabelCont from "./SideTabComponents/SideTabLabelCont";
import SideTabBodyCont from "./SideTabComponents/SideTabBodyCont";
import SideTabTab from "./SideTabComponents/SideTabTab";
import SideTabBody from "./SideTabComponents/SideTabBody";
import ProjectPreview from "./ProjectPreview";


//figure out passing auth0id in
//add bootstrap form classes
class ProjectList extends React.Component {
    state = {
        bidInviteProj: []
    }

    componentDidUpdate() {
        const accessToken = this.props.user.auth.getAccessToken() || '';
     
        if (this.state.bidInviteProj.length === 0) {
            if (accessToken === '') {
                this.props.history.push("/dashboard")
            } else {
                const headers = { 'Authorization': `Bearer ${accessToken}` }
                const url = "/api/projectsdash/" + this.props.user.mongoId

                axios.get(url, { headers }).then(res => {
                    console.log(res);
                    this.setState({
                        bidInviteProj: res.data.bidInviteProj
                    });


                });

            }
        }
    }
    //{
    //     this.state.projects.map(project => (
    //         <div key={project._id}>
    //             <h2>{project.title}</h2>
    //             <p>{project.body}</p>
    //         </div>
    //     ))
    // }

    render() {
        return (
            <div className="row">
  
            <SideTabLabelCont>
                    {this.state.bidInviteProj.map(project => (
                     
                        <SideTabTab title={project.projectName} tabId={project._id} tabTarget={project._id} key={project._id}/>

                    ))}
                    
                </SideTabLabelCont>


                <SideTabBodyCont>
                    {this.state.bidInviteProj.map(project => (
                        <SideTabBody tabBodyId={project._id} tabController={project._id} key={project._id}>
                            <ProjectPreview title={project.projectName} location={project.projectLocation} projectId={project._id} />
                        </SideTabBody>
                    ))}
                </SideTabBodyCont>

            </div>


        )

    }

}
//access the router info through this.props.history - use the push method to navigate somewhere new, 
//and use replace to switch to a new place, but come back to the same place if we hit the back button
export default ProjectList;
