import React from 'react';
import { morePadding, labelStyle } from '../styles';

const Categories = ({ category, categoryRadioUpdate }) => { 

  const categories = ['Textbooks', 'Clothing', 'Furniture', 'Electronics', 'Kitchenware', 'Games'];

  return (
    <div className="form-group radio-group" style={morePadding}>
      
      <label style={labelStyle} htmlFor="inputCategory3" className="col-sm-2 control-label-custom">
        Category
      </label>

      { categories.map(cat => (
        <div 
          onClick={categoryRadioUpdate} 
          className={`col-sm-1 radio-button ${category === cat ? "radio-active" : "" }`}
        >
          { cat }
        </div>
      ))}      
    </div>
  )
};

export { Categories };