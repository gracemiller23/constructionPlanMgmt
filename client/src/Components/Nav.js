import React, {Component} from 'react';
import { Link } from "react-router-dom";



class Nav extends Component {

    render(){
        const loggedIn = this.props.auth.isAuthenticated();
       const canWrite = this.props.auth.userHasScopes(["write:projects"]);

    
        return (
            <div>
          <div>
          {(!loggedIn) ? (
            <button onClick={this.props.auth.login}>Log In</button>
          
          ) : (
              <div>
          <button onClick={this.props.auth.logout}>Log Off</button>
          <div>
          <button onClick={this.props.handleStepToDash}>Go To Dashboard</button>

          </div>
          </div>
          )}
          </div>
         
              <div>
    
          <Link to="/">Home&nbsp;</Link>
          {(loggedIn && canWrite) ? (<Link to="/edit">Write&nbsp;</Link> ): ("") }
          {(loggedIn) ? (<Link to="/profile" >Profile&nbsp;</Link>) : ("") }
    
          </div>
          </div>
        );

}
}

export default Nav;
