import React, { Component } from 'react';
import CardContainer from '../Components/Subcomponents/CardContainer';
import { withRouter } from "react-router-dom";
import Button from '../Components/Subcomponents/Button';
import { UserConsumer } from '../UserContext';


class Landing extends Component {
  // componentDidMount(){
  //   if (!this.props.user.auth.userHasScopes(["read:projects"])){
  //     this.props.history.push("/buildprofile");
  //   }
  //}

  render() {
     
    return (
      <UserConsumer>
      {prov => (
      <div className="container-fluid">
             <div className="row ">
        <div className="col home-sign-in">
       <CardContainer conClassNames=" text-center home-sign-in-box" headClassNames=" text-center blue" cardHeadTxt="GPD Plan Room" >
       <h3 className="card-title text-center">Welcome to the GPD Plan Room</h3>
              <p className="card-text text-center">By navigating this site, you are agreeing to our terms and conditions.</p>
        
         {(!prov.state.auth.isAuthenticated()) ? 
         (<Button onClick={prov.state.auth.login} classNames=" blue" text="Login"/>) 
         : 
            (<Button onClick={prov.handleStepToDash} classNames=" blue" text="Go To Dashboard"/>)
         }
         </CardContainer>
         </div>
         </div>
      </div>
       )}
       </UserConsumer>
    );
  }
}

export default withRouter(Landing);