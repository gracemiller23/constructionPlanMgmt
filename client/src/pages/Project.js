import React, { Component } from 'react';

class Project extends Component {
  render() {

    return (
      <div className="container-fluid">
          {this.props.match.params.id}
      </div>
    );
  }
}

export default Project;