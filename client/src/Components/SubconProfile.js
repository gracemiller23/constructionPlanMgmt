import React from 'react';

const SubconProfile = (props)=>{
    //send profile, formatPhone, editProfilePath
    //<SubconProfile profile={} formatPhone={} editProfilePath={}/>

    let phoneNum1 = props.profile.contactPhone;
    let phoneNum2 = props.formatPhone(phoneNum1);

        return(
            <div>
            <div className="row"> 
                <div className="col-lg-9 col-sm-12">
                    <h2>{props.firstName} {props.lastName}</h2>
                    <p>{props.profile.companyName}</p>
                    <p>{props.profile.contactEmail} | {phoneNum2}</p>
                </div>
                <div className="col-lg-3 col-sm-12">
                    <a href={props.editProfilePath}><button>Edit Profile</button></a>
                </div>
            </div>
            <div className="row"> 
                <div className="col">
                    <p>{props.profile.companyAddress1}{(props.profile.companyAddress2) ? (", " + props.profilecompanyAddress2): ("")}</p>
                    <p>{props.profile.companyCity}, {props.profile.companyState} {props.profile.companyZip} </p>
                </div>
            
            </div>
            </div>
            
        )


}

export default SubconProfile;
