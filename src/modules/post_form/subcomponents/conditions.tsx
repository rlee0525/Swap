import React from 'react';
import { morePadding, labelStyle } from '../styles';

const Conditions = ({ condition, conditionRadioUpdate }) => {

  return (
    <div className="form-group radio-group" style={morePadding}>
      <label style={labelStyle} htmlFor="inputCondition3" className="col-sm-2 control-label-custom">Condition</label>
        <div onClick={conditionRadioUpdate} className={`col-sm-3 radio-button ${condition === "Brand New" ? "radio-active" : "" }`}>Brand New</div>
        <div onClick={conditionRadioUpdate} className={`col-sm-3 radio-button ${condition === "Like New" ? "radio-active" : "" }`}>Like New</div>
        <div onClick={conditionRadioUpdate} className={`col-sm-3 radio-button ${condition === "Used" ? "radio-active" : "" }`}>Used</div>
    </div>
  )
};

export { Conditions };