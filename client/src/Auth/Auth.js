// src/Auth/Auth.js
import auth0 from 'auth0-js';
import history from "../history";
import axios from "axios";

const origin = window.location.origin;

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'gpd-plan-room.auth0.com',
    clientID: 'MhaJyCN2WXdeGquLkBJ7WRyVRjOcsnm3',
    redirectUri: origin + '/callback',
    audience: 'gpd-plan-room',
    responseType: 'token id_token',
    scope: 'openid profile read:projects write:projects'
  });

  userProfile;
  loggedIn;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        //pull values below and test for scope internally to this function?
        console.log(`inside handle authentication: \n ${JSON.stringify(authResult)}`);
       this.loggedIn = true;
        const grantedScopes = authResult.idTokenPayload["https://example.com/role_scopes"];

          //figure out way to redirect to buildprofile - use "go to" button?
          //evaluate permissions based on hierarchy of scopes granted through Auth0 Rules
        if(grantedScopes.includes("profile")){
          console.log("I think this user should go to / from handleAuth");
            history.replace('/');
        }else if(grantedScopes.includes("openid")){
              //add user to the mongo database
                  const accessToken = authResult.accessToken || '';
                  if (accessToken === ''){
                    this.logout();
                  } else{
                  const headers = { 'Authorization': `Bearer ${authResult.accessToken}` }
                  axios.post("/api/firstprofile", {auth0Id: authResult.idTokenPayload.sub, contactEmail: authResult.idTokenPayload.name, profileStage:"incomplete"}, {headers}).then(res =>{
                    console.log(res);
                    //uses react-router-dom's history method "push" to send the user to the designated route
                    this.logout();
                    return history.replace('/awaitapproval');
                    
                  });

                  
          }
        }else{
              return history.replace('/');
          }
        
      } else if (err) {
        this.loggedIn = false;
          console.log(err);
        history.replace('/');
      
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    const scopes = authResult.scope || this.requestedScopes || "";
    localStorage.setItem("scopes", JSON.stringify(scopes));
    // navigate to the home route
    history.replace('/')
  }

  login() {
    this.auth0.authorize();
    this.loggedIn = true;
   
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No Access Token found');
    }
    return accessToken;
  }

  userHasScopes(scopes) {

    let _scopes = JSON.parse(localStorage.getItem("scopes")) || " ";

   const grantedScopes = _scopes.split(' ');
   return scopes.every(scope => grantedScopes.includes(scope));

  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

}