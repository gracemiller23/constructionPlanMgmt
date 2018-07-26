import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import SubconProfile from "../Components/SubconProfile";
import { UserConsumer } from '../UserContext';

import SubconProfile from '../Components/SubconProfile';
import Dashboard from '../Components/Dashboard';
import TopTabTabCont from '../Components/Subcomponents/TopTabElements/TopTabTabCont';
import TopTabBodyCont from '../Components/Subcomponents/TopTabElements/TopTabBodyCont';
import TopTabTab from '../Components/Subcomponents/TopTabElements/TopTabTab';
import TopTabBody from '../Components/Subcomponents/TopTabElements/TopTabBody';


class SubDashboard extends Component {
    state = {
        projects: [],
        profile: {}
    }

    componentWillMount() {
        // this.setState({ profile: {} });
        // const { userProfile, getProfile } = this.props.auth;
        // const accessToken = localStorage.getItem('access_token') || '';
        // if (accessToken === '') {
        //     this.setState({profile: {sub: "please log in to see your profile"}});
        // }else{
        //     if (!userProfile) {
        //         getProfile((err, profile) => {
        //             this.setState({ profile });
        //             console.log(this.state.profile);
        //         });
        //     } else {
        //         this.setState({ profile: userProfile });
        //         console.log(this.state.profile);
        //     }
        // }
    }
    //for post, headers go after data sent to post
    refreshProjects() {
        // const { getAccessToken } = this.props.auth;
        // const accessToken = localStorage.getItem('access_token') || '';
        // if (accessToken === ''){
        //     this.setState({ projects: [{_id:1, title: "Please log in to view projects"}]});
        // } else{
        // const headers = { 'Authorization': `Bearer ${getAccessToken()}` };
        // axios.get("/api/profile", { headers }).then((res) => {
        //     console.log(res);
        //     this.setState({ profile: res.data });
        // });
        //}
    }

    componentDidMount() {
        // this.refreshProjects();
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
                            <div class="row">

                            </div>
                            <div class="row">
                                <div class="col">
                                    <TopTabTabCont tabContId="subprofile-tab-top">

                                        <TopTabTab title="New Invitations" linkId="new-invitations" linkClasses="active" linkToId="new-invitations-content" selected="true" />
                                        <TopTabTab title="Accepted Invitations" linkId="accepted-invitations" linkToId="accepted-invitations-content" selected="false" />
                                        <TopTabTab title="Awarded Projects" linkId="awarded-projects" linkToId="awarded-projects-content" selected="false" />
                                        <TopTabTab title="My Profile" linkId="my-profile" linkClasses="ml-auto" linkToId="my-profile-content" selected="false" />

                                    </TopTabTabCont>
                                    <TopTabBodyCont tabBodyId="subprofile-tab-body">
                                        <TopTabBody tabBodyClasses="show active" tabBodyId="new-invitations-content" tabTopId="new-invitations">
                                        <div><p>Here's something</p></div>
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