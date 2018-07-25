import React from 'react';


const TopTabBodyCont = (props) => {
    //props include: 
    //tabBodyId (required)
    // <TopTabBodyCont tabBodyId="">
    // </TopTabBodyCont>
    return (
        <div className="tab-content" id={props.tabBodyId} >
            {props.children}
            </div>
    )
  }

  export default TopTabBodyCont;