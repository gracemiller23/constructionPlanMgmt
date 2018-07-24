import React, { Component } from 'react';
import Dashboard from '../Components/Dashboard';

class Project extends Component {
  render() {

    return (
      <div className="container-fluid">
        <Dashboard>
          {this.props.match.params.id}
          </Dashboard>
      </div>
    );
  }
}

export default Project;