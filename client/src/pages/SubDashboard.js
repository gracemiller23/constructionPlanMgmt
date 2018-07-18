import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import SubconProfile from "../Components/SubconProfile";



class SubDashboard extends Component {
    state = {
        projects:[],
        profile:{}
    }

    componentWillMount() {
        this.setState({ profile: {} });
        const { userProfile, getProfile } = this.props.auth;
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

    refreshProjects(){
        axios.get("/api/test").then((res) =>{
            console.log(res);
            this.setState({projects: res.data});
        });
    }

    componentDidMount(){
        this.refreshProjects();
    }


    render() {
        return (
            <div>
                            <Link to="/editsubprofile">Edit Profile</Link>
    <div>
        <SubconProfile sub={this.state.profile.sub}/>
        </div>
                            <div>

                {
                    this.state.projects.map( project => (
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