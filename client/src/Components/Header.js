import React, { Component } from 'react';
import { Router, Route, Redirect } from "react-router-dom";


import history from '../history';




import SubDashboard from '../pages/SubDashboard';
import Profileform from '../pages/Profileform';
import Callback from '../pages/Callback';
import NeedAdminApproval from '../pages/NeedAdminApproval';
import Landing from '../pages/Landing';
import Nav from './Nav';
import AdminDashboard from '../pages/AdminDashboard';
import EditProject from '../pages/EditProject';
import Project from '../pages/Project';



class Header extends Component {

    render() {
        //const authenticUser= this.props.state.auth.isAuthenticated();
        //const scopes = this.props.state.auth.userHasScopes()
        const isAdmin =  this.props.state.auth.userHasScopes(["write:projects"]);
        const fullUserSubcontractor =this.props.state.auth.userHasScopes(["read:projects"]);
        const needsProfile =  this.props.state.auth.userHasScopes(["profile"]);
        const unapprovedUser =  this.props.state.auth.userHasScopes(["openid"]) && !this.props.state.auth.userHasScopes(["profile"]);
        return (
            
                    <Router history={history}>
                        <div>
                            <Nav auth={this.props.state.auth} userName={this.props.state.profile} handleStepToDash={this.props.handleStepToDash}/>

                            <Route exact path="/" render={(props) => <Landing user={this.props.state} {...props} />} />
                            
                     
                            <div>
                            <Route exact path="/awaitapproval" render={(props) => {
                                return(
                                        unapprovedUser ? (
                                            <NeedAdminApproval auth={this.props.auth} {...props} />
                                        ) : (
                                            <Redirect to="/"/>
                                        )
                                    )

                                }
                            } />

                            <Route exact path="/buildprofile" render={(props) => {
                                return(
                                        needsProfile ? (
                                            <Profileform user={this.props.state}  {...props} />
                                        ) : (
                                            <Redirect to="/"/>
                                        )
                                    )

                                }
                            } />

                            <Route exact path="/editprofile" render={(props) => {
                                return(
                                    fullUserSubcontractor ? (
                                            <Profileform auth={this.props.auth} {...props} />
                                        ) : (
                                            <Redirect to="/subdashboard"/>
                                        )
                                    )

                                }
                            } />


                            <Route exact path="/subdashboard" render={(props) => {
                                return(
                                    fullUserSubcontractor ? (
                                            <SubDashboard auth={this.props.state.auth} user={this.props.state.profile} {...props} />
                                        ) : (
                                            <Redirect to="/"/>
                                        )
                                    )

                                }
                            } />

                    
                            <Route exact path="/dashboard" render={(props) => {
                                return(
                                        isAdmin ? (
                                            <AdminDashboard auth={this.props.state.auth} {...props} />
                                        ) : (
                                            <Redirect to="/subdashboard"/>
                                        )
                                    )

                                }
                            } />

                                  <Route exact path="/newproject" render={(props) => {
                                return(
                                        isAdmin ? (
                                            <EditProject auth={this.props.auth} {...props} />
                                        ) : (
                                            <Redirect to="/subdashboard"/>
                                        )
                                    )

                                }
                            } />

                             <Route path="/project/:id" render={(props) => {
                                return(
                                    fullUserSubcontractor ? (
                                            <Project auth={this.props.auth} {...props} />
                                        ) : (
                                            <Redirect to="/"/>
                                        )
                                    )

                                }
                            } />

                            <Route path="/editproject/:id" render={(props) => {
                                return(
                                        isAdmin ? (
                                            <EditProject auth={this.props.auth} {...props} />
                                        ) : (
                                            <Redirect to="/subdashboard"/>
                                        )
                                    )

                                }
                            } />
                     </div>

                    


                            <Route path="/callback" render={(props) => {
                                this.props.state.auth.handleAuthentication(props);
                                return <Callback {...props} />
                            }} />


                        </div>
                    </Router>
          

        );
    }
}

export default Header;