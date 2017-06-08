import React from 'react';
import { Link } from 'react-router';

interface ICategory {
  link : string;
  title : string;
  description : string;
  image : string;
}

interface Props {
  viewDescription : (e: any) => void;
  hideDescription : (e: any) => void;
  category : ICategory;
}

const CategoryBox: React.SFC<Props> = ({ viewDescription, hideDescription, category }) => (
  <div className="col-xxs-12 col-xs-6 col-md-4">
    <Link to={category.link} className="thumbnail" onMouseOver={viewDescription} onMouseOut={hideDescription}>
      <img className="thumbnail-image" src={category.image} alt="..."/>
      <div className="carousel-caption">
        <h3 className="category-title">{category.title}</h3>
        <p className="category-description hide">{category.description}</p>
      </div>
    </Link>
  </div>
);

export { CategoryBox };
