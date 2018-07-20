import React from "react";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";


class Profileform extends React.Component {
    state = {
        title:"",
        body:""
      }

      handleInputChange = event => {
        const value = event.target.value;
        const title = event.target.name;
        this.setState({[title]: value})
      }
    
      postForm = event => {
        event.preventDefault();
        const {title, body} = this.state;
        const { getAccessToken } = this.props.auth;
        const accessToken = localStorage.getItem('access_token') || '';
        if (accessToken === ''){
            this.setState({ projects: [{_id:1, title: "Please log in to view projects"}]});
        } else{
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        axios.post("/api/test", {title,body}, {headers}).then(res =>{
          console.log(res);
          this.setState({title: "", body:""});
          //uses react-router-dom's history method "push" to send the user to the designated route
          this.props.history.push("/");
        });
    }
      }

render(){
    return (
        <div>
            <Link to="/">Home</Link>
        <form>
            <input name="title" value={this.state.title} onChange={this.handleInputChange} />
            <textarea name="body" value={this.state.body} onChange={this.handleInputChange}></textarea>
            <button onClick={this.postForm}>Submit</button>
        </form>
</div>

        )
    
}

}
//access the router info through this.props.history - use the push method to navigate somewhere new, 
//and use replace to switch to a new place, but come back to the same place if we hit the back button
export default withRouter(Profileform);
