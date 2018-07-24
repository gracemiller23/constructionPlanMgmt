import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../GPDLOGO.png';
import '../AppStyle.css';


class Nav extends Component {

    render() {
        const loggedIn = this.props.auth.isAuthenticated();
        const isAdmin = this.props.auth.userHasScopes(["write:projects"]);


        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light  ">
                    <a className="navbar-brand mr-auto" href="/"><img src={Logo} alt="logo" className="logo navbar-brand" /></a>
                    <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon ml-auto"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            {(!loggedIn) ? (
                                <li className="nav-item">
                                </li>
                            ) : (
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/dashboard">Dashboard <span class="sr-only">(current)</span></a>
                                    </li>
                                )}

 {(loggedIn && isAdmin) ? ( <li className="nav-item">
                                <a class="nav-link" href="/newproject">+ Add Project</a>
                            </li>) : ( <li className="nav-item">
                            </li>)}

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Help
                          </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">How to Use</a>
                                    <a className="dropdown-item" href="#">My Account</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Request Help</a>
                                </div>
                            </li>
                            {(!loggedIn) ? (

                                <li className="nav-item">
                                    <button className="nav-button" onClick={this.props.auth.login}>Log In</button>
                                </li>
                            ) : (
                                    <li className="nav-item">
                                        <button className="nav-button" onClick={this.props.auth.logout}>Log Out</button>
                                    </li>
                                )}
                        </ul>

                    </div>
                </nav>
            
            </div>
        );

    }
}

export default Nav;
