import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = (props) => (  
  <div className="form-group">
  <label className="form-label">{props.title}</label>
    <select
      name={props.name}
      value={props.selectedOption}
      onChange={props.controlFunc}
      className="form-select form-control">
      <option value="">{props.placeholder}</option>
      {props.options.map(opt => {
        return (
          <option
            key={opt}
            value={opt}>{opt}</option>
        );
      })}
    </select>
  </div>
);

SelectInput.propTypes = {  
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string,
  controlFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default SelectInput;  

//special thanks to Loren Stewart for an amazing react forms tutorial!