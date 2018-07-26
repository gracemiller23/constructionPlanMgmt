import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => (  
  <div className="form-group">
    <label className="form-label">{props.title}</label>
    <div className="checkbox-group">
      {props.options.map(opt => {
                console.log("in opt map before " + displayName + "\n--" +opt)
        let displayName = opt.companyName + " - " + opt.tradeCategory;
        console.log("in opt map after " + displayName + "\n--" +opt)
        return (
          <label key={opt._id} className="form-label capitalize">
            <input
              className="form-checkbox form-control"
              name={"invitedSubcontractors"}
              onChange={props.controlFunc}
              value={opt._id}
              checked={ props.selectedOptions.indexOf(opt._id) > -1 }
              type={props.type} /> {displayName}
          </label>
        );
      })}
    </div>
  </div>
);

Checkbox.propTypes = {  
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  setName: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array,
  controlFunc: PropTypes.func.isRequired
};

export default Checkbox; 

//special thanks to Loren Stewart for an amazing react forms tutorial!