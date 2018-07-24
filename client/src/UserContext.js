import React from 'react';
import Auth from './Auth/Auth';


const lauth = new Auth();


const UserContext = React.createContext();

class UserProvider extends React.Component {
    state = { 
        auth: lauth, 
        handleAuthentication: lauth.handleAuthentication,

        profile:""
   
    }
//soon to be depracated lifecycle event - don't use
    componentWillMount(){
        console.log("in willMount");
    
        
    }

    componentDidMount (){
        console.log("the component mounted")
        console.log(lauth);
            if(lauth.isAuthenticated()){
            const { userProfile, getProfile } = lauth;
            if (!userProfile) {
              getProfile((err, profile) => {
                this.setState({ profile: profile.name});
                console.log("_____________________");
                console.log("SETTING THE USER NAME IN PROFILE OF STATE")
                console.log(this.state.profile)
                console.log("_____________________");

                });
            } else {
                this.setState({ profile: userProfile.name});
            }
        }else{
            console.log("login first")
        }

    }

    handleLogin =()=>{
        lauth.login();

    }


    handleLogout = ()=>{
        lauth.logout();
        this.setState({profile: ""});

    }

    handleStepToDash =()=>{
        const isAdmin = lauth.userHasScopes(["write:projects"]);
        const isSubContractor = lauth.userHasScopes(["read:projects"]);
        
        //const origin = window.location.origin;



        if(isAdmin){
            console.log("redirecting **************")
            window.location.href= "/dashboard";
        }else if(isSubContractor){
            window.location.href="/subdashboard";
        }else{
            window.location.href="/";
        }
    }

    render() {
        console.log("inside of render")
        console.log(this.state.profile);

      return (
        <UserContext.Provider
          value={{state:this.state, handleLogin: this.handleLogin, handleLogout: this.handleLogout, handleStepToDash: this.handleStepToDash}}
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