import React from 'react';

import { morePadding, labelStyle } from '../styles';

interface Props {
  type: string;
  list: string[];
  clickAction: any;
  currentValue: string;
}

const RadioButtons: React.SFC<Props> = ({ type, list, clickAction, currentValue}) => (
  <div className="form-group radio-group" style={morePadding}>
    <label style={labelStyle} htmlFor="inputCategory3" className="col-sm-2 control-label-custom">
      { type }
    </label>

    <div className="input-group">
      { list.map(item => (
          <div 
            onClick={clickAction}
            id="radio-list"
            className={`col-xs-12 col-sm-3 col-md-2 radio-button ${currentValue === item ? "radio-active" : "" }`}
          >
            { item }
          </div>
        )) }      
    </div>
  </div>
);

export { RadioButtons };