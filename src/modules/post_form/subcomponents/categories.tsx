import React from 'react';
import { morePadding, labelStyle } from '../styles';

const Categories = ({ category, categoryRadioUpdate }) => (
  <div className="form-group radio-group" style={morePadding}>
    <label style={labelStyle} htmlFor="inputCategory3" className="col-sm-2 control-label-custom">Category</label>
      <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Textbooks" ? "radio-active" : "" }`}>Textbooks</div>
      <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Clothing" ? "radio-active" : "" }`}>Clothing</div>
      <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Furniture" ? "radio-active" : "" }`}>Furniture</div>
      <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Electronics" ? "radio-active" : "" }`}>Electronics</div>
      <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Kitchenware" ? "radio-active" : "" }`}>Kitchenware</div>
      <div onClick={this.categoryRadioUpdate} className={`col-sm-1 radio-button ${this.state.category === "Games" ? "radio-active" : "" }`}>Games</div>
  </div>
);

export { Categories };