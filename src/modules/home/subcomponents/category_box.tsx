import React from 'react';

interface ICategory {
  category: string;
  title: string;
  description: string;
  image: string;
}

interface Props {
  viewDescription: (e: any) => void;
  hideDescription: (e: any) => void;
  box: ICategory;
}

interface State {
}

const CategoryBox: React.SFC<Props> = ({ viewDescription, hideDescription, box }) => (
  <div className="col-xs-6 col-md-4">
    <a href="/#/textbooks" className="thumbnail" onMouseOver={viewDescription} onMouseOut={hideDescription}>
      <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494382616/textbooks_cgpwt3.jpg" alt="..."/>
      <div className="carousel-caption">
        <h3 className="category-title">Textbooks</h3>
        <p className="category-description hide">Stop overpaying for used textbooks</p>
      </div>
    </a>
  </div>
);
export { CategoryBox };