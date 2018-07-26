import React, { Component } from "react";

//import SubconProfile from "../Components/SubconProfile";
import { UserConsumer } from '../UserContext';

import SubconProfile from '../Components/SubconProfile';
import Dashboard from '../Components/Dashboard';
import TopTabTabCont from '../Components/Subcomponents/TopTabElements/TopTabTabCont';
import TopTabBodyCont from '../Components/Subcomponents/TopTabElements/TopTabBodyCont';
import TopTabTab from '../Components/Subcomponents/TopTabElements/TopTabTab';
import TopTabBody from '../Components/Subcomponents/TopTabElements/TopTabBody';
import ProjectList from "../Components/Subcomponents/ProjectList";


class SubDashboard extends Component {
    

    
    //for post, headers go after data sent to post
    refreshProjects() {
       
    }

    // was inside the render
    //{
    //     this.state.projects.map(project => (
    //         <div key={project._id}>
    //             <h2>{project.title}</h2>
    //             <p>{project.body}</p>
    //         </div>
    //     ))
    // }

    // <div>
    // <Link to="/editsubprofile">Edit Profile</Link>
    // <div>
    //     <p>{JSON.stringify(this.state.profile)}</p>
    // </div>

    render() {
        return (


            <UserConsumer>
                {prov => (
                    <div className="container-fluid">
                        <Dashboard>
                            <div className="row">

                            </div>
                            <div className="row">
                                <div className="col">
                                    <TopTabTabCont tabContId="subprofile-tab-top">

                                        <TopTabTab title="New Invitations" linkId="new-invitations" linkClasses="active" linkToId="new-invitations-content" selected="true" />
                                        <TopTabTab title="Accepted Invitations" linkId="accepted-invitations" linkToId="accepted-invitations-content" selected="false" />
                                        <TopTabTab title="Awarded Projects" linkId="awarded-projects" linkToId="awarded-projects-content" selected="false" />
                                        <TopTabTab title="My Profile" linkId="my-profile" linkClasses="ml-auto" linkToId="my-profile-content" selected="false" />

                                    </TopTabTabCont>
                                    <TopTabBodyCont tabBodyId="subprofile-tab-body">
                                        <TopTabBody tabBodyClasses="show active" tabBodyId="new-invitations-content" tabTopId="new-invitations">
                                            <ProjectList user={prov.state}/>
                                        </TopTabBody>
                                        <TopTabBody tabBodyId="accepted-invitations-content" tabTopId="accepted-invitations">
                                        <div><p>Here's something</p></div>
                                        </TopTabBody>
                                        <TopTabBody tabBodyId="awarded-projects-content" tabTopId="awarded-projects">
                                        <div><p>Here's something</p></div>
                                        </TopTabBody>
                                        <TopTabBody tabBodyId="my-profile-content" tabTopId="my-profile">
                                            <SubconProfile profile={prov.state.profile} firstName={prov.name.firstName} lastName={prov.name.lastName} formatPhone={prov.formatPhoneNumber} editProfilePath={""} />
                                        </TopTabBody>

                                    </TopTabBodyCont>
                                </div>
                            </div>

                        </Dashboard>
                    </div>

                )}
            </UserConsumer>

        )
    }
}

export default SubDashboard;