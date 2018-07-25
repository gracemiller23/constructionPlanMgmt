import React from 'react';


const TopTabTab = (props) => {
    //props include: 
    //title (required) 
    //linkId (required) - will need to match aria-labelledby in its content area
    //linkClasses - add active here for the one that will be open first
    //linkToId (required) - id of content to link to withOUT #
    //selected (required) - true or false - set the one open first to true and others to false
    
    let linkClasses = "nav-link ";
    if(props.linkClasses){
        classes = "nav-link " + props.linkClasses;
    }
    let linkTo = "#"+props.linkToId;

    return (
        <li className="nav-item">
            <a className={classes} id={props.linkId} data-toggle="tab" href={linkTo} aria-controls={props.linkToId} role="tab">
                {props.title}
                </a>
        </li>
    )
  }

  export default TopTabTab;