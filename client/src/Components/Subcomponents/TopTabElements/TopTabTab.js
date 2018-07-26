import React from 'react';


const TopTabTab = (props) => {
    //props include: 
    //title (required) 
    //linkId (required) - will need to match aria-labelledby in its content area
    //linkClasses - add active here for the one that will be open first
    //tabClasses - add ml-auto if you want to right justify a tab
    //linkToId (required) - id of content to link to withOUT #
    //selected (required) - true or false - set the one open first to true and others to false
    //<TopTabTab title="" linkId="" linkClasses="" linkToId="" selected=""/>

    
    let linkClasses = "nav-link ";
    if(props.linkClasses){
        linkClasses = "nav-link " + props.linkClasses;
    }
    let tabClassess = "nav-item ";
    if(props.tabClasses){
        tabClassess = "nav-item " + props.tabClasses;
    }
    let linkTo = "#"+props.linkToId;

    return (
        <li className={tabClassess}>
            <a className={linkClasses} id={props.linkId} data-toggle="tab" href={linkTo} aria-controls={props.linkToId} role="tab">
                {props.title}
                </a>
        </li>
    )
  }

  export default TopTabTab;


//   <TopTabTabCont tabContId="">

//                     <TopTabTab title="" linkId="" linkClasses="active" linkToId="" selected=""/>
//                     <TopTabTab title="" linkId="" linkClasses="" linkToId="" selected=""/>
//                     <TopTabTab title="" linkId="" linkClasses="" linkToId="" selected=""/>
//                     <TopTabTab title="" linkId="" linkClasses="" linkToId="" selected=""/>

//                   </TopTabTabCont>
//                 <TopTabBodyCont tabBodyId="">
//                       <TopTabBody tabBodyClasses="show active" tabBodyId="" tabTopId="">
                        
//                         </TopTabBody>
//                         <TopTabBody tabBodyClasses="" tabBodyId="" tabTopId="">
                        
//                         </TopTabBody>
//                         <TopTabBody tabBodyClasses="" tabBodyId="" tabTopId="">
                        
//                         </TopTabBody>
//                         <TopTabBody tabBodyClasses="" tabBodyId="" tabTopId="">
                        
//                         </TopTabBody>
//                   </TopTabBodyCont>