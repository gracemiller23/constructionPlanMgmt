import React, { Component } from 'react';
import { Router, Route, Redirect } from "react-router-dom";

import history from '../history';


import SubDashboard from '../pages/SubDashboard';
import Profileform from '../pages/Profileform';
import Callback from '../pages/Callback';
import NeedAdminApproval from '../pages/NeedAdminApproval';
import Landing from '../pages/Landing';
import Nav from './Nav';



class Header extends Component {

    render() {
        const isAdmin = this.props.state.auth.userHasScopes(["write:projects"]);
        const fullUserSubcontractor = this.props.state.auth.userHasScopes(["read:projects"]);
        const needsProfile = this.props.state.auth.userHasScopes(["profile"]) && !this.props.state.auth.userHasScopes(["read:projects"]);
        const unapprovedUser = this.props.state.auth.userHasScopes(["openid"]) && !this.props.state.auth.userHasScopes(["profile"]) 
        return (
            
                    <Router history={history}>
                        <div>
                  
         
                            <Nav auth={this.props.state.auth} userName={this.props.state.profile} handleStepToDash={this.props.handleStepToDash}/>

                            <Route exact path="/" render={(props) => <Landing auth={props.auth} {...props} />} />
                            <Route exact path="/awaitapproval" render={(props) => <NeedAdminApproval auth={props.auth} {...props} />} />

                            <Route exact path="/buildprofile" render={(props) => <Profileform auth={props.auth} {...props} />} />
                            
                            <Route exact path="/subdashboard" render={(props) => <SubDashboard auth={props.auth} {...props} />} />

                            <Route exact path="/editsubprofile" render={(props) => {
                                return(
                                    isAdmin ? (
                                        <Profileform auth={props.auth} {...props} />
                                    ) : (
                                        <Redirect to="/"/>
                                    )
                                )

                            }
                        
                            } />

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