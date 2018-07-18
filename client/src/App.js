import React, { Component } from 'react';

import {Router, Route} from "react-router-dom";

import SubDashboard from './pages/SubDashboard';
import Profileform from './pages/Profileform';
import Callback from './pages/Callback';

import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {

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

        <Route exact path="/" render={(props)=><SubDashboard auth={auth} {...props}/>}/>
        <Route exact path="/editsubprofile" render={(props)=><Profileform auth={auth} {...props}/>}/>

 <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>

        
      </div>
      </Router>
    );
  }
}

export default App;
