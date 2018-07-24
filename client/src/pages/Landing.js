import React, { Component } from 'react';
import CardContainer from '../Components/Subcomponents/CardContainer';
import Button from '../Components/Subcomponents/Button';
import { UserConsumer } from '../UserContext';


class Landing extends Component {

  render() {

    return (
      <UserConsumer>
      {prov => (
      <div className="container-fluid">
             <div class="row ">
        <div class="col home-sign-in">
       <CardContainer conClassNames=" text-center home-sign-in-box" headClassNames=" text-center blue" cardHeadTxt="GPD Plan Room" >
       <h3 class="card-title text-center">Welcome to the GPD Plan Room</h3>
              <p class="card-text text-center">By navigating this site, you are agreeing to our terms and conditions.</p>

         {(!prov.state.auth.isAuthenticated()) ? 
         (<Button onClick={prov.state.auth.login} classNames=" blue" text="Login"/>) 
         : ( <Button onClick={prov.handleStepToDash} classNames=" blue" text="Go To Dashboard"/>)
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

export default Landing;