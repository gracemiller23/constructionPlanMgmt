import React from 'react';
import Auth from './Auth/Auth';


const lauth = new Auth();


const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    lauth.handleAuthentication();

  }
}

let authThisShit = lauth.isAuthenticated();

const UserContext = React.createContext();

class UserProvider extends React.Component {
    state = { 
        auth: {}, 
        handleAuthentication: handleAuthentication,
        loggedIn: true,
        profile:""
   
    }
//soon to be depracated lifecycle event - don't use
    componentWillMount(){
        console.log("in willMount");
        console.log(authThisShit);
        console.log("____________________")
        if(authThisShit){
            this.setState({loggedIn: true});
        }
        
    }

    componentDidMount (){
        console.log("the component mounted")
        console.log(lauth);
       
        if(authThisShit){
            const { userProfile, getProfile } = lauth;
            if (!userProfile) {
              getProfile((err, profile) => {
                this.setState({ auth: lauth, profile: profile.sub, loggedIn: true });
              });
            } else {
             
                    this.setState({ profile: userProfile.sub, loggedIn: true });
              
            }
        }else{
            console.log("login first")
            this.setState({loggedIn: false})
        }
   
    }

    handleLogin =()=>{
        lauth.login();
        this.setState({loggedIn: true});

    }


    handleLogout = ()=>{
        lauth.logout();
        this.setState({loggedIn: false, profile: ""});

    }

    render() {
        console.log("inside of render")
        console.log(this.state.loggedIn);

      return (
        <UserContext.Provider
          value={{state:this.state, handleLogin: this.handleLogin, handleLogout: this.handleLogout}}
        >
          {this.props.children}
        </UserContext.Provider>
      )
    }
  }

  const UserConsumer = UserContext.Consumer

  export { UserProvider, UserConsumer }

  //need to pass login and logout methods -- 
  //resolve the fact that when the component mounts loggedIn is false, 
  //which interferes with redirecting in the router