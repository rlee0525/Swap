import React from 'react';

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.viewDescription = this.viewDescription.bind(this);
    this.hideDescription = this.hideDescription.bind(this);
  }

  public componentDidMount() {

  }

  public viewDescription(e) {
    e.currentTarget.querySelectorAll('img')[0].classList.add("thumbnail-backdrop");
    let title = e.currentTarget.querySelectorAll('h3')[0];
    let description = e.currentTarget.querySelectorAll('p')[0];

    description.classList.remove("hide");
    description.classList.add("animated");
    description.classList.add("zoomIn");

    title.classList.add("animated");
    title.classList.add("slideInDown");
  }

  public hideDescription(e) {
    e.currentTarget.querySelectorAll('img')[0].classList.remove("thumbnail-backdrop");
    let title = e.currentTarget.querySelectorAll('h3')[0];
    let description = e.currentTarget.querySelectorAll('p')[0];

    description.classList.add("hide");
    description.classList.remove("animated");
    description.classList.remove("zoomIn");

    title.classList.remove("animated");
    title.classList.remove("slideInDown");
  }

  public render() {
    return (
      <div>
        <div className="block app-block-intro">
          <div className="container text-center">
            <h1 className="block-title m-b-sm text-uppercase app-myphone-brand">Swap</h1>
            <p className="lead m-b-lg p-b-md">Best marketplace. For students, exclusively.</p>
          </div>
        </div>
        <div>
          <div className="container" id="add-margin-bottom">
            <div className="row">
              <div className="col-xs-6 col-md-4">
                <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                  <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494382616/textbooks_cgpwt3.jpg" alt="..."/>
                  <div className="carousel-caption">
                    <h3 className="category-title">Textbooks</h3>
                    <p className="category-description hide">Buy all your textbooks at a much cheaper price</p>
                  </div>
                </a>
              </div>
              <div className="col-xs-6 col-md-4">
                <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                  <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494383271/furniture_crbpql.jpg" alt="..."/>
                  <div className="carousel-caption">
                    <h3 className="category-title">Furniture</h3>
                    <p className="category-description hide">Buy all your furniture at a much cheaper price</p>
                  </div>
                </a>
              </div>
              <div className="col-xs-6 col-md-4">
                <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                  <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_fill,h_500,w_500/v1494384935/clothing_xjdmxd.png" alt="..."/>
                  <div className="carousel-caption">
                    <h3 className="category-title">Clothing</h3>
                    <p className="category-description hide">Buy all your clothing at a much cheaper price</p>
                  </div>
                </a>
              </div>
              <div className="col-xs-6 col-md-4">
                <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                  <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494385420/kitchenware_brijih.jpg" alt="..."/>
                  <div className="carousel-caption">
                    <h3 className="category-title">Kitchenware</h3>
                    <p className="category-description hide">Buy all your kitchenware at a much cheaper price</p>
                  </div>
                </a>
              </div>
              <div className="col-xs-6 col-md-4">
                <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                  <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494385670/electronics_fqplnz.jpg" alt="..."/>
                  <div className="carousel-caption">
                    <h3 className="category-title">Electronics</h3>
                    <p className="category-description hide">Buy all your electronics at a much cheaper price</p>
                  </div>
                </a>
              </div>
              <div className="col-xs-6 col-md-4">
                <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                  <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494386061/games_sn1bay.png" alt="..."/>
                  <div className="carousel-caption">
                    <h3 className="category-title">Games</h3>
                    <p className="category-description hide">Buy all your games at a much cheaper price</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
