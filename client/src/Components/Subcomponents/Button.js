import React from 'react';


const Button = (props) => {
    //props include: onClick (req), classNames, text (req), name, type, value
    let btnVal = props.value || "";
    let btnName = props.name || "";
    let btnClass = props.classNames || "";
    let btnType = props.type || "";
    



    return (
        <button className={btnClass} type={btnType} onClick={props.onClick} value={btnVal} name={btnName} >
        {props.text}
        </button>
    )
  }

  export default Button;