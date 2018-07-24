import React, { Component } from 'react';
import CardContainer from '../Components/Subcomponents/CardContainer';
import Button from '../Components/Subcomponents/Button';


class NeedAdminApproval extends Component {
  render() {

    return (
      <div className="container-fluid">
<div class="row ">
        <div class="col home-sign-in">
       <CardContainer conClassNames=" text-center home-sign-in-box" headClassNames=" text-center blue" cardHeadTxt="GPD Plan Room" >
       <h3 class="card-title text-center">Your account must be approved by an administrator to continue.</h3>
              <p class="card-text text-center">By navigating this site, you are agreeing to our terms and conditions.</p>

         </CardContainer>
         </div>
         </div>      </div>
    );
  }
}

export default NeedAdminApproval;