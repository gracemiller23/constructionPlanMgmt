import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SubconProfile from "../Components/SubconProfile";



class SubDashboard extends Component {
    state = {
        projects: [],
        profile: {}
    }

    componentWillMount() {
        this.setState({ profile: {} });
        const { userProfile, getProfile } = this.props.auth;
        const accessToken = localStorage.getItem('access_token') || '';
        if (accessToken === '') {
            this.setState({profile: {sub: "please log in to see your profile"}});
        }else{
            if (!userProfile) {
                getProfile((err, profile) => {
                    this.setState({ profile });
                    console.log(this.state.profile);
                });
            } else {
                this.setState({ profile: userProfile });
                console.log(this.state.profile);
            }
        }
    }
    //for post, headers go after data sent to post
    refreshProjects() {
        const { getAccessToken } = this.props.auth;
        const accessToken = localStorage.getItem('access_token') || '';
        if (accessToken === ''){
            this.setState({ projects: [{_id:1, title: "Please log in to view projects"}]});
        } else{
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` };
        axios.get("/api/test", { headers }).then((res) => {
            console.log(res);
            this.setState({ projects: res.data });
        });
    }
    }

    componentDidMount() {
        this.refreshProjects();
    }


    render() {
        return (
            <div>
                <Link to="/editsubprofile">Edit Profile</Link>
                <div>
                    
                </div>
                <div>

                    {
                        this.state.projects.map(project => (
                            <div key={project._id}>
                                <h2>{project.title}</h2>
                                <p>{project.body}</p>
                            </div>
                        ))
                    }
                </div>

            </div>
        )
    }
}

export default SubDashboard;