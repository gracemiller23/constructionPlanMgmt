
import React from 'react';


const SideTabLabelCont = (props) => {

    return (
        <div class="col-4">
        <div class="list-group" id="list-tab" role="tablist">
        {props.children}
        </div>
    </div>
    )
  }

  export default SideTabLabelCont;


