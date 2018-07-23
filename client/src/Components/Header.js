import React, { Component } from 'react';
import { Router, Route, Redirect } from "react-router-dom";
import { UserConsumer } from '../UserContext';
import history from '../history';


import SubDashboard from '../pages/SubDashboard';
import Profileform from '../pages/Profileform';
import Callback from '../pages/Callback';
import NeedAdminApproval from '../pages/NeedAdminApproval';
import Landing from '../pages/Landing';



class Header extends Component {

    render() {
        return (
            <UserConsumer>
                {prov => (
                    <Router history={history}>
                        <div>
                            <div> Hi {prov.state.profile}! It WORKED!</div>
                            <div>
                                {
                                    prov.state.loggedIn ?
                                        (<div>Logged In <button onClick={prov.handleLogout}>Log Out</button></div>)
                                        :
                                        (<div>Logged Out <button onClick={prov.handleLogin}>Log In</button></div>)
                                }
                            </div>

                            <Route exact path="/" render={(props) => <Landing auth={prov.state.auth} {...props} />} />
                            <Route exact path="/awaitapproval" render={(props) => <NeedAdminApproval auth={prov.state.auth} {...props} />} />

                            <Route exact path="/buildprofile" render={(props) => <Profileform auth={prov.state.auth} {...props} />} />
                            <Route exact path="/subdashboard" render={(props) => <SubDashboard auth={prov.state.auth} {...props} />} />

                            <Route exact path="/editsubprofile" render={(props) => 
                                
                                { 
                                    console.log(prov.state);
                                    return prov.state.loggedIn ?
                                (<Profileform auth={prov.auth} {...props} />):
                                    (<Redirect to="/" />)
                                }
                            } />

                            <Route path="/callback" render={(props) => {
                                prov.state.handleAuthentication(props);
                                return <Callback {...props} />
                            }} />


                        </div>
                    </Router>
                )}
            </UserConsumer>

        );
    }
}

export default Header;