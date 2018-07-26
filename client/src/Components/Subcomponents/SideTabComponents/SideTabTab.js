
import React from 'react';


const SideTabTab = (props) => {
    //props include: 
    //title - title of the tab
    //classes - set to active if this is the first tab open
    //tabId - needed for tabs navigation
    //tabTarget 

    let tabClasses = "list-group-item list-group-item-action"
    if (props.classes){
        tabClasses = "list-group-item list-group-item-action " + props.classes;
    }

    let tabhref= "#"+props.tabTarget;
    let ttabId=props.tabId +"tab";



    return (
        <div>
 <a className={tabClasses} id={props.ttabId} data-toggle="list" href={tabhref} role="tab" aria-controls={props.tabTarget}>{props.title}</a>

    </div>
    )
  }

  export default SideTabTab;


