
import React from 'react';


const SideTabBodyCont = (props) => {
    //props include: 
    //title (required)
    //location(required)
    //projectId (required)


    return (
        <div class="col-8">
                          <div class="tab-content" id="nav-tabContent">
                          {props.children}
        </div>
    </div>
    )
  }

  export default SideTabBodyCont;


