import React, { Component } from 'react';

class NeedAdminApproval extends Component {
  render() {

    return (
      <div className="container-fluid">
        Your account must be approved by an admin before you can proceed. If you have any questions please use the contact form below.
      </div>
    );
  }
}

export default NeedAdminApproval;