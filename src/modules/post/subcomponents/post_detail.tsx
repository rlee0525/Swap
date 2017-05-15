import React from 'react';
import { SearchNavbar } from 'modules/search/subcomponents';
import { shortenString, timeFromNow } from 'helpers';

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  public componentWillMount() {
    const id = this.props.id;
    this.props.getPost(id);
  }

  public componentWillReceiveProps(nextProps) {
    const nextId = nextProps.id;
    if (nextId !== this.props.id) {
      this.props.getPost(nextId);
    }
  }

  public renderCarousel() {
    let img_url1;
    let img_url2;
    let img_url3;
    let created_at;

    if (this.props.post) {
      img_url1 = this.props.post.img_url1;
      img_url2 = this.props.post.img_url2;
      img_url3 = this.props.post.img_url3;
      created_at = this.props.post.created_at;
    }
    // TODO: Refactor using iteration

    return (
      <div className="carousel-inner" role="listbox">
        <div className="item active">
          <div className="block">
            <div className="container">
              <div className="col-sm-6">
                 <img className="img-responsive center-block app-block-game-img" src={img_url1} />
                 <div className="thumbnail-caption">{timeFromNow(created_at)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="block">
            <div className="container">
              <div className="col-sm-6">
                 <img className="img-responsive center-block app-block-game-img" src={img_url2} />
                 <div className="thumbnail-caption">{timeFromNow(created_at)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="block">
            <div className="container">
              <div className="col-sm-6">
                 <img className="img-responsive center-block app-block-game-img" src={img_url3} />
                 <div className="thumbnail-caption">{timeFromNow(created_at)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  public renderDetail() {
    let title;
    let description;
    let price;

    if (this.props.post) {
      title = this.props.post.title;
      description = this.props.post.description;
      price = this.props.post.price;
    }

    return (
      <div className="col-lg-6">
        <h3>{title}</h3>
        <p>{description}</p>
        <h3>${Number(price).toLocaleString()}</h3>
        <a className="btn btn-success btn-lg btn-block">Purchase</a>
      </div>
    )
  }

  public render() {
    console.log(this.props)
    return (
      <div className="container">
        <SearchNavbar search={this.props.search} />
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div className="block p-l-0 p-t-0 p-r-0">
            <div id="carousel-example-generic-2" className="carousel carousel-light slide" data-ride="carousel">
             <ol className="carousel-indicators">
               <li data-target="#carousel-example-generic-2" data-slide-to="0" className="active"></li>
               <li data-target="#carousel-example-generic-2" data-slide-to="1"></li>
               <li data-target="#carousel-example-generic-2" data-slide-to="2"></li>
             </ol>
             {this.renderCarousel()}
             <a className="left carousel-control" href="#carousel-example-generic-2" role="button" data-slide="prev">
               <span className="icon icon-chevron-thin-left" aria-hidden="true"></span>
               <span className="sr-only">Previous</span>
             </a>
             <a className="right carousel-control" href="#carousel-example-generic-2" role="button" data-slide="next">
               <span className="icon icon-chevron-thin-right" aria-hidden="true"></span>
               <span className="sr-only">Next</span>
             </a>
           </div>
          </div>
        </div>
        {this.renderDetail()}
      </div>
    )
  }
}

export { PostDetail };
