import React from 'react';
import Auth from './Auth/Auth';
import axios from "axios";


const lauth = new Auth();


const UserContext = React.createContext();

class UserProvider extends React.Component {
    state = { 
        auth: lauth, 
        handleAuthentication: lauth.handleAuthentication,
        profile:{}
   
    }
//soon to be depracated lifecycle event - don't use
    componentWillMount(){
        console.log("in willMount");
    
        
    }

    componentDidMount (){
       
            if(lauth.isAuthenticated()){
            const { userProfile, getProfile } = lauth;
            console.log("the component mounted")
            console.log(userProfile);

            if (!userProfile) {
                let accessToken = lauth.getAccessToken();
                getProfile((err, profile) => {
                   
                    let url;
                    //if the user is an admin, use the appropriate axios route
                    if(profile.sub ==="auth0|5b4e55872fb56226994a34b4"){
                        console.log("I know you're an admin");
                        url="/api/adminprofile/" + profile.sub;
                    }else{
                        console.log("I know you're a subcontractor");
                       url = "/api/profile/" + profile.sub;
                    }
                    
                    const headers = { 'Authorization': `Bearer ${accessToken}` }
                    axios.get(url, {headers}).then(res =>{

                        this.setState({profile: res.data});
                        console.log("inside usercontext __________");
                        console.log(this.state.profile.contactName.firstName);
                        console.log("inside usercontext __________");
                        

                    
                  });

                });
            } else {
                this.setState({ profile: {}});
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
            window.location.href="/buildprofile";
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