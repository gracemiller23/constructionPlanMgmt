import React, { Component } from 'react';
import Header from './Components/Header';
import { UserProvider, UserConsumer } from './UserContext';


class App extends Component {

  render() {

    return (
      <div>
        <UserProvider>
        <UserConsumer>
                {prov => (
          <Header state={prov.state} handleLogin={prov.handleLogin} handleLogout={prov.handleLogout} handleStepToDash={prov.handleStepToDash}/>
        
        )}
        </UserConsumer>
          </UserProvider>
      </div>

    );
  }
}

export default App;
