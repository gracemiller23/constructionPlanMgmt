
import React from 'react';


const SideTabBody = (props) => {
    //props include: 
 
    //classes - set to 'active show' if this is the first tab open
    //tabBodyId - needed for tabs navigation
    //tabController - id of tab that links to this body

    let tabClasses = "tab-pane fade "
    if (props.classes){
        tabClasses = "list-group-item list-group-item-action " + props.classes;
    }

    let tabhref= "#"+props.tabTarget;
    let controller = props.tabController + "tab";



    return (
        <div className={tabClasses} id={props.tabBodyId} role="tabpanel" aria-labelledby={props.tabController}>
 {props.children}


    </div>
    )
  }

  export default SideTabBody;


