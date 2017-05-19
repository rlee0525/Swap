import React from 'react';
import { SearchNavbar } from 'modules/search/subcomponents';
import { shortenString, timeFromNow } from 'helpers';
import Clipboard from 'clipboard';
declare var $;

class PostDetail extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      userFB: null,
      currentUser: null
    }

    this.contactPerson = this.contactPerson.bind(this);
    this.initializeClipboard = this.initializeClipboard.bind(this);
  }

  public componentWillMount() {
    const id = this.props.id;
    this.props.getPost(id, this.props.user.auth.accessToken);
  }

  public componentDidMount() {
    this.initializeClipboard();
  }

  public initializeClipboard() {
    var clipboard = new Clipboard('#copy-template');
    clipboard.on('success', function(e) {
      $(e.trigger).text("copied!")
      setTimeout(function(){ $(e.trigger).text("Copy Link"); }, 1000)
      e.clearSelection();
    });
  }

  public componentWillReceiveProps(nextProps) {
    const nextId = nextProps.id;

    if (nextId !== this.props.id) {
      this.props.getPost(nextId);
    }
  }

  public buttonClass(condition: string) {
    if (condition === 'Brand New') {
      return 'info';
    } else if (condition === 'Like New') {
      return 'primary';
    } else {
      return 'success';
    }
  }

  public renderCarouselIndicators() {
    if (!this.props.post) return null;
    let { img_url1, img_url2, img_url3 } = this.props.post;
    let imageArray = [img_url1, img_url2, img_url3].filter(el => el !== null);
    imageArray = imageArray.map((el, idx) => (
      <li key={idx} data-target="#carousel-example-generic-2"
        data-slide-to={idx} className={idx === 0 ? "active" : ""}></li>
    ))
    return (
      <ol className="carousel-indicators">{imageArray}</ol>
    )
  }

  public renderCarousel() {
    if (!this.props.post) return null;
    let { img_url1, img_url2, img_url3 } = this.props.post;
    let imageArray = [img_url1, img_url2, img_url3].filter(el => el !== null);

    if (img_url2) {
      $('.carousel-control').removeClass("hide");
      $('.carousel-indicators').removeClass("hide");
    } else {
      $('.carousel-control').addClass("hide");
      $('.carousel-indicators').addClass("hide");
    }

    imageArray = imageArray.map((el, idx) => (
      <div key={idx} className={`item absolute-height ${idx == 0 ? "active" : ""}`}>
        <div className="block" id="carousel-container">
          <div className="container">
            <div className="col-sm-6">
              <img className="img-responsive center-block app-block-game-img" src={el} />
            </div>
          </div>
        </div>
      </div>
    ))

    return (
      <div className="carousel-inner" role="listbox">
        {imageArray}
      </div>
    )
  }

  public contactPerson() {
    $('#contactModal').modal("show");
  }

  public fetchAuthor() {
    (window as any).FB.api(`/${this.props.post.fb_id}?fields=email,name,link,picture`, response => {
      this.setState({ userFB: response });
    });

    (window as any).FB.api(`/me?fields=email,name`, res => {
      this.setState({ currentUser: res });
    });
  }

  public renderDetail() {
    let titleMargin = {
      marginBottom: 10
    };

    if (typeof this.props.post === "undefined") return null;
    let { title, description, price, created_at, views, condition } = this.props.post;

    return (
      <div className="col-lg-6 col-md-6 col-sm-6 absolute-height" id="detail-body">
        <h3 style={titleMargin}>{title}</h3>
        <p className="red"><span className={`label label-${this.buttonClass(condition)}`} id="label-micro">{condition}</span><span className="glyphicon glyphicon-fire"  id="condition-views"></span> {views} Views </p>
        <p id="post-description">{description}</p>

        <h3 className="text-left">${Number(price).toLocaleString()}</h3>
        <div className="row">
          <span className="btn btn-warning btn-lg col-md-2 col-sm-2 col-xs-2 bottom-margin-spacing glyphicon glyphicon-bookmark" id="bookmark-btn"></span>
          <a className="btn btn-primary btn-lg col-md-9 col-sm-9 col-xs-9" onClick={() => {this.fetchAuthor(); this.contactPerson();}}>Contact the Seller</a>

          <a id="contactModalTrigger" className="hidden" data-toggle="modal" data-target="#contactModal">Contact Modal Trigger</a>
          <div className="modal fade" id="contactModal" tabIndex={-1} role="dialog"
               aria-labelledby="contactModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header" id="contact-modal-header">
                  <h3 className="modal-title" id="contactModalLabel">Contact the Seller</h3>
                </div>
                <div className="modal-body text-center" id="contact-modal-body">
                  <div className="modal-body text-center">
                    <div>
                      <div id="purchase-msg-template" contentEditable={true}>
                        Hi, {this.state.userFB && this.state.userFB.name}, <br/><br/>
                        My name is {this.state.currentUser && this.state.currentUser.name}. I saw your posting on {this.props.post.title} on Swap.<br/>
                        I would like to purchase it at ${this.props.post.price}.<br/>
                        Please let me know if it's still available.<br/>

                        link: {(window as any).localhost_url}/#/posts/{this.props.post.id}<br/><br/>

                        Thanks,<br/>
                        {this.state.currentUser && this.state.currentUser.name}
                      </div>
                    </div>
                    <button type="button" className="btn btn-sm btn-primary" data-clipboard-target="#purchase-msg-template" id="copy-template">Copy Message</button>
                  </div>
                </div>
                <div className="modal-footer" id="fb-footer">

                    <button type="button" className="btn btn-sm btn-fb" id="fb-name-contact">
                      <span id="fb-contact-text">Contact {this.state.userFB && this.state.userFB.name}</span>
                      {this.state.userFB &&
                        <a target="_blank" href={this.state.userFB.link}>
                          <img src={this.state.userFB.picture.data.url} id="fb-img-id" />
                        </a>
                      }
                    </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  public render() {
    let link;

    if (this.props.post.category) {
      link = this.props.post.category.toLowerCase();
    }

    return (
      <div className="container" id="container-body">
        <SearchNavbar search={this.props.search} />
        <nav className="breadcrumb">
          <a className="breadcrumb-item" href="#/recent">All</a>
          <a className="breadcrumb-item" href={`#/${link}`}>{this.props.post.category}</a>
          <span className="breadcrumb-item active">{this.props.post.title && shortenString(this.props.post.title, 20)}</span>
        </nav>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" id="detail-left">
          <div className="block p-l-0 p-t-0 p-r-0" id="small-img-padding">
            <div id="carousel-example-generic-2" className="carousel carousel-light slide" data-ride="carousel">
             {this.renderCarouselIndicators()}
             {this.renderCarousel()}
             <a className="left carousel-control" href="#carousel-example-generic-2" role="button" data-slide="prev">
               <span className="icon icon-chevron-thin-left" aria-hidden="true" id="carousel-arrows-left"></span>
               <span className="sr-only">Previous</span>
             </a>
             <a className="right carousel-control" href="#carousel-example-generic-2" role="button" data-slide="next">
               <span className="icon icon-chevron-thin-right" aria-hidden="true" id="carousel-arrows-right"></span>
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
