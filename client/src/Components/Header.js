import React, { Component } from 'react';
import {Router, Route, Redirect} from "react-router-dom";

import SubDashboard from '../pages/SubDashboard';
import Profileform from '../pages/Profileform';
import Callback from '../pages/Callback';
import NeedAdminApproval from '../pages/NeedAdminApproval';
import Landing from '../pages/Landing';

import Auth from '../Auth/Auth';
import history from '../history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class Header extends Component {

    render() {
      const {isAuthenticated} = auth;
  
      return (
        <Router history={history}>
        <div >
          <div>
            {
              isAuthenticated() ? 
              (<div>Logged In <button onClick={() => auth.logout()}>Log Out</button></div>) 
              : 
              (<div>Logged Out <button onClick={() => auth.login()}>Log In</button></div>)
            }
            </div>
  
          <Route exact path="/" render={(props)=><Landing auth={auth} {...props}/>}/>
          <Route exact path="/awaitapproval" render={(props)=><NeedAdminApproval auth={auth} {...props}/>}/>
          
          <Route exact path="/buildprofile" render={(props)=><Profileform auth={auth} {...props}/>}/>
          <Route exact path="/subdashboard" render={(props)=><SubDashboard auth={auth} {...props}/>}/>
  
          <Route exact path="/editsubprofile" render={(props)=>{
          const isAllowed = auth.isAuthenticated() && auth.userHasScopes(['write:projects']);
          return  isAllowed ?
                  (<Profileform auth={auth} {...props}/>)
                  :(
                    <Redirect to="/"/>
                  )
                }
        }/>
  
   <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
  
          
        </div>
        </Router>
      );
    }
  }
  
  export default Header;