import React from 'react';


const Button = (props) => {
    //props include: onClick (req), classNames, text (req), name, type, value, disabled (true or false)
    let btnVal = props.value || "";
    let btnName = props.name || "";
    let btnClass = props.classNames || "";
    let btnType = props.type || "";
    let btnDisabled;

    if(props.disabled === true){
        btnDisabled = "disabled";
    }else{
        btnDisabled ="";
    }


    return (
        <button className={btnClass} type={btnType} onClick={props.onClick} value={btnVal} name={btnName} btnDisabled>
        {props.text}
        </button>
    )
  }

  export default Button;