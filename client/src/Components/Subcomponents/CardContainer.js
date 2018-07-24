import React from 'react';


const CardContainer = (props) => {
    //props include: conClassNames, headClassNames, bodClassNames
    //use child elements to add "card-title", "card-text" classes with titles and paragraphs, buttons, etc. below card text

    const cardConClassNames = "card" + props.conClassNames;
    const cardHeadClassNames = "card-header" + props.headClassNames;
    const cardBodClassNames = "card-body" + (props.bodClassNamesn || "");

    return (
        <div className={cardConClassNames}>
        
            <div class={cardHeadClassNames} >
              <h1>{props.cardHeadTxt}</h1>
            </div>
            <div class={cardBodClassNames}>
                    {props.children}
            </div>
    </div>
    )
  }

  export default CardContainer;