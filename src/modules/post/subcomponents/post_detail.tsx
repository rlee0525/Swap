import React from 'react';
import { SearchNavbar } from 'modules/search/subcomponents';
import { shortenString, timeFromNow } from 'helpers';
import Clipboard from 'clipboard';

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
    this.props.getPost(id);
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
        <div className="item absolute-height active">
          <div className="block">
            <div className="container">
              <div className="col-sm-6">
                <img className="img-responsive center-block app-block-game-img" src={img_url1} />
              </div>
            </div>
          </div>
        </div>
        <div className="item absolute-height">
          <div className="block">
            <div className="container">
              <div className="col-sm-6">
                <img className="img-responsive center-block app-block-game-img" src={img_url2} />
              </div>
            </div>
          </div>
        </div>
        <div className="item absolute-height">
          <div className="block">
            <div className="container">
              <div className="col-sm-6">
                <img className="img-responsive center-block app-block-game-img" src={img_url3} />
              </div>
            </div>
          </div>
        </div>
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
    let title;
    let description;
    let price;
    let created_at;

    if (this.props.post) {
      title = this.props.post.title;
      description = this.props.post.description;
      price = this.props.post.price;
      created_at = this.props.post.created_at;
    }

    return (
      <div className="col-lg-6 col-md-6 col-sm-6 absolute-height">
        <h3>{title}</h3><div className="thumbnail-caption">{timeFromNow(created_at)}</div>
        <p id="post-description">{description}</p>
        <h3 className="text-left">${Number(price).toLocaleString()}</h3>
        <div className="row">
          <a className="btn btn-warning btn-lg col-md-3 col-sm-5 col-xs-3" id="bookmark-btn">Bookmark</a>
          <a className="btn btn-success btn-lg col-md-8 col-sm-6 col-xs-8" onClick={() => {this.fetchAuthor(); this.contactPerson();}}>Contact</a>

          <a id="contactModalTrigger" className="hidden" data-toggle="modal" data-target="#contactModal">Contact Modal Trigger</a>
          <div className="modal fade" id="contactModal" tabIndex={-1} role="dialog"
               aria-labelledby="contactModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header" id="contact-modal-header">
                  <h3 className="modal-title" id="contactModalLabel">Contact the Seller</h3>
                </div>
                <div className="modal-body text-center" id="contact-modal-body">
                  <div className="modal-body text-center row">
                    <span>{this.state.userFB && this.state.userFB.name}</span>
                    <div>{this.state.userFB && <a target="_blank" href={this.state.userFB.link}><img src={this.state.userFB.picture.data.url} /></a>}</div>
                  </div>
                  <div className="modal-body text-center">
                    <div>
                      <div id="purchase-msg-template" contentEditable={true}>
                        Hi, {this.state.userFB && this.state.userFB.name}, <br/><br/>
                        My name is {this.state.currentUser && this.state.currentUser.name}. I saw your posting on {this.props.post.title} on Swap.<br/>
                        I would like to purchase it at ${this.props.post.price}.<br/>
                        Please let me know if it's still available.<br/>
                        link: www.swapnow.io/#/posts/{this.props.post.id}<br/><br/>

                        Thanks,<br/>
                        {this.state.currentUser && this.state.currentUser.name}
                      </div>
                    </div>
                    <button type="button" className="btn btn-sm btn-primary" data-clipboard-target="#purchase-msg-template" id="copy-template">Copy Message</button>
                  </div>
                </div>
                <div className="modal-footer"></div>
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
      <div className="container">
        <SearchNavbar search={this.props.search} />
        <nav className="breadcrumb">
          <a className="breadcrumb-item" href="#/recent">All</a>
          <a className="breadcrumb-item" href={`#/${link}`}>{this.props.post.category}</a>
          <span className="breadcrumb-item active">{this.props.post.title}</span>
        </nav>
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
