import React from 'react';

class Post extends React.Component<any, any> {
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
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494382616/textbooks_cgpwt3.jpg" alt="..."/>
                <div className="carousel-caption">
                  <h3 className="category-title">Textbooks</h3>
                  <p className="category-description hide">My description</p>
                </div>
              </a>
            </div>
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494383271/furniture_crbpql.jpg" alt="..."/>
                <div className="carousel-caption">
                  <h3 className="category-title">Furniture</h3>
                  <p className="category-description hide">My description</p>
                </div>
              </a>
            </div>
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_fill,h_500,w_500/v1494384935/clothing_xjdmxd.png" alt="..."/>
                <div className="carousel-caption">
                  <h3 className="category-title">Clothing</h3>
                  <p className="category-description hide">My description</p>
                </div>
              </a>
            </div>
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494385420/kitchenware_brijih.jpg" alt="..."/>
                <div className="carousel-caption">
                  <h3 className="category-title">Kitchenware</h3>
                  <p className="category-description hide">My description</p>
                </div>
              </a>
            </div>
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494385670/electronics_fqplnz.jpg" alt="..."/>
                <div className="carousel-caption">
                  <h3 className="category-title">Electronics</h3>
                  <p className="category-description hide">My description</p>
                </div>
              </a>
            </div>
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail" onMouseOver={(e) => this.viewDescription(e)} onMouseOut={(e) => this.hideDescription(e)}>
                <img className="thumbnail-image" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494386061/games_sn1bay.png" alt="..."/>
                <div className="carousel-caption">
                  <h3 className="category-title">Games</h3>
                  <p className="category-description hide">My description</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="block app-block-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-2 m-b">
                <ul className="list-unstyled list-spaced">
                  <li><h6 className="text-uppercase">Products</h6></li>
                  <li>Todo</li>
                  <li>Calendario</li>
                  <li>Email Town</li>
                  <li>Pomodorotary</li>
                  <li>ChillTower</li>
                </ul>
              </div>
              <div className="col-sm-2 m-b">
                <ul className="list-unstyled list-spaced">
                  <li><h6 className="text-uppercase">Extras</h6></li>
                  <li>AutotuneU</li>
                  <li>Freestyler</li>
                  <li>Chillaxation</li>
                </ul>
              </div>
              <div className="col-sm-2 m-b">
                <ul className="list-unstyled list-spaced">
                  <li><h6 className="text-uppercase">Support</h6></li>
                  <li>Online Support</li>
                  <li>Telephone Sales</li>
                  <li>Help Desk</li>
                  <li>Workshops</li>
                </ul>
              </div>
               <div className="col-sm-6">
                <h6 className="text-uppercase">About</h6>
                <p>Shoutout to Invision team for creating the <a href="http://www.invisionapp.com/do">Do UI kit</a> that we used to fake our app screenshots. Also to the Dribbble community for providing phone mockups that look amazing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
