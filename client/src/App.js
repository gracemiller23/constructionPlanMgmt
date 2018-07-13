import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  state = {
    title:"",
    body:""
  }
  getClickRequest(){
    axios.get("/api/test").then(res=>{
      console.log("get test");
    });
  }

  getPostRequest() {
    axios.post("/api/test", {test: true}).then(res=>{
      console.log("post test");
    });
  }

  saveForm= event =>{
    event.preventDefault();
    console.log(this.state.title);
    console.log(this.state.body);


  }

  handleInputChange = event => {
    const value = event.target.value;
    const title = event.target.name;
    this.setState({[title]: value})
  }

  postForm = event => {
    event.preventDefault();
    const {title, body} = this.state;
    axios.post("/api/test", {title,body}).then(res =>{
      console.log(res);
      this.setState({title: "", body:""});
    });
  }
  render() {
    
    return (
      <div >

        <form>
          <input name="title" value={this.state.title} onChange={this.handleInputChange}/>
          <textarea name= "body" value={this.state.body} onChange={this.handleInputChange}></textarea>
          <button onClick={this.postForm}>submit</button>
          </form>
      </div>
    );
  }
}

export default App;
