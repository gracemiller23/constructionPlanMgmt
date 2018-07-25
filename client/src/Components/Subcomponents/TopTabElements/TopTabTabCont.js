import React from 'react';


const TopTabTabCont = (props) => {
    //props include: classes, tabContId (required), 

    let classes = "nav nav-tabs ";
    if(props.classes){
        classes = "nav nav-tabs " + props.classes;
    }

    return (
        <ul className={classes} id={props.tabContId} role="tablist">
            {props.children}
            </ul>
    )
  }

  export default TopTabTabCont;