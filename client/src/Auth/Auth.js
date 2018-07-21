// src/Auth/Auth.js
import auth0 from 'auth0-js';
import history from "../history";

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
        //problem is that these variables are undefined when the if statements start to 
        //execute, and then the result comes through later...
        const grantedScopes = authResult.idTokenPayload["https://example.com/role_scopes"];

          //need to add admin redirect
          //evaluate permissions based on hierarchy of permissions granted through Auth0 Rules
          if(grantedScopes.includes("read:projects")){
              return history.replace('/subdashboard');
          }else if(grantedScopes.includes("profile")){
              return history.replace('/buildprofile');
          }else if(grantedScopes.includes("openid")){
            this.logout();
              return history.replace('/awaitapproval');
          }else{
              return history.replace('/');
          }
        
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
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

  userHasScopes(scope) {
    console.log(`inside userHasScopes: ${scope}`)

    let accessToken = this.getAccessToken();
    let hasScopes= false;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        //accesses the scopes stored in the profile through a rule created in Auth0
        const grantedScopes = profile["https://example.com/role_scopes"];
        //if the granted scopes = the scopes requested
      
          if (grantedScopes.includes(scope)) {

            hasScopes = true;
            console.log(`inside userHasScopes: ${hasScopes}`)

          } else {
            hasScopes = false;
            console.log(`inside userHasScopes: ${hasScopes}`)
          
          }
       
        
        console.log(`inside userHasScopes this is what it's returning in the end: ${hasScopes}`)
        return hasScopes;

      } else if (err) {
        console.log(`Error in userHasScopes: ${err}`);
        return false;
      }

    });



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