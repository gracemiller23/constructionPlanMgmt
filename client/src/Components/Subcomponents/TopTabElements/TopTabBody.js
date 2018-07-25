import React from 'react';


const TopTabBody = (props) => {
    //props include: 
    //tabBodyClasses - include "show active" if this is the first visible
    //tabBodyId (required) include #
    //tabTopId (required - NO #) id for the top tab that controls this body pane 
    //<TopTabBody tabBodyClasses="show active" tabBodyId="" tabTopId="">
   // </TopTabBody>

    let classes = "tab-pane fade ";
    if(props.tabBodyClasses){
        classes = "tab-pane fade " + props.tabBodyClasses;
    }

    return (
        <div className={classes} id={props.tabBodyId} role="tab-panel" aria-labelledby={props.tabTopId}>
            {props.children}
            </div>
    )
  }

  export default TopTabBody;