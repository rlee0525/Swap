import React from 'react';
import { SearchNavbar } from 'modules/search/subcomponents';
import { shortenString, timeFromNow } from 'helpers';
import Clipboard from 'clipboard';
declare var $;

class PostDetail extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      authorFB: null,
      user: null,
      currentUser: null,
      bookmarked: false,
      ownPost: false
    }

    this.contactPerson = this.contactPerson.bind(this);
    this.initializeClipboard = this.initializeClipboard.bind(this);
    this.createBookmark = this.createBookmark.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.checkVerifiedContact = this.checkVerifiedContact.bind(this);
    this.checkVerifiedBookmark = this.checkVerifiedBookmark.bind(this);
  }

  public initializePost() {
    const accessToken = this.props.user.auth.accessToken;
    const id = this.props.id;
    this.props.getPost(id, accessToken).then(
      res => { this.fetchAuthor() }
    );
  }

  public componentDidMount() {
    this.initializeClipboard();
    this.initializePost();
  }

  public checkVerifiedContact(id) {
    let that = this;

    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        const accessToken = (FB as any).getAccessToken();
        $.ajax({
          method: "GET",
          url: `api/users/${accessToken}`
        }).then(obj => {
          if (obj.edu_email_confirmed) {
            that.contactPerson();
          } else if (obj.edu_email === null) {
            $('#emailInputModal').modal('show');
          } else {
            $('#emailVerificationModal').modal('show');
          }
        }).fail(() => FB.logout(res => console.log(res)))
      } else {
        $('#logInModal').modal('show');
      }
    });
  }

  public checkVerifiedBookmark(id) {
    let that = this;

    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        const accessToken = (FB as any).getAccessToken();
        $.ajax({
          method: "GET",
          url: `api/users/${accessToken}`
        }).then(obj => {
          if (obj.edu_email_confirmed) {
            that.createBookmark();
          } else if (obj.edu_email === null) {
            $('#emailInputModal').modal('show');
          } else {
            $('#emailVerificationModal').modal('show');
          }
        }).fail(() => FB.logout(res => console.log(res)))
      } else {
        $('#logInModal').modal('show');
      }
    });
  }

  public createBookmark() {
    const access_token = this.props.user.auth.accessToken;
    const id = this.props.id;
    const bookmark = {
      post_id: id
    };

    if (this.props.post.is_bookmarked) {
      $.ajax({
        type: "DELETE",
        url: `api/bookmarks/${id}`,
        data: { access_token }
      }).then(res => {
        this.initializePost();
      });
    } else {
      $.ajax({
        method: "POST",
        url: `api/bookmarks`,
        data: { bookmark, access_token }
      }).then(res => {
        this.initializePost();
      });
    }
  }

  public initializeClipboard() {
    var clipboard = new Clipboard('#copy-template');

    clipboard.on('success', function(e) {
      $(e.trigger).text("copied!")
      setTimeout(function(){ $(e.trigger).text("Copy Link"); }, 1000)
      e.clearSelection();
    });
  }

  public deletePost(id) {
    const access_token = this.props.user.auth.access_token;

    $.ajax({
      type: "PATCH",
      url: `api/posts/${id}`,
      data: { access_token, method: "delete" }
    }).then(() => window.location.href = `#/recent`);
  }

  public editPost(id) {
    window.location.href = `#/posts/edit/${id}`;
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
    ));

    return (
      <ol className="carousel-indicators">{imageArray}</ol>
    );
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
      this.setState({ authorFB: response });
    });
  }

  public renderModal() {
    if (!this.state.authorFB) return null;
    let { name, link, picture } = this.state.authorFB;

    return (
      <div>
        <a id="contactModalTrigger" className="hidden" data-toggle="modal" data-target="#contactModal">Contact Modal Trigger</a>
        <div className="modal fade" id="contactModal" tabIndex={-1} role="dialog"
            aria-labelledby="contactModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="contact-modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h3 className="modal-title" id="contactModalLabel">Contact the Seller</h3>
              </div>
              <div className="modal-body text-center" id="contact-modal-body">
                <div className="modal-body text-center">
                  <div>
                    <div id="purchase-msg-template" contentEditable={true} data-toggle="tooltip" data-placement="bottom" title="click to edit">
                      Hi, {name}, <br/><br/>
                      My name is {this.props.user.userFB.name}. I saw your posting on {this.props.post.title} on Swap.<br/>
                      I would like to purchase it at ${this.props.post.price}.<br/>
                      Please let me know if it's still available.<br/>

                      link: {(window as any).localhost_url}/#/posts/{this.props.post.id}<br/><br/>

                      Thanks,<br/>
                      {this.props.user.userFB.name}
                    </div>
                  </div>
                  <button type="button" className="btn btn-sm btn-primary" data-clipboard-target="#purchase-msg-template" id="copy-template">Copy Message</button>
                </div>
              </div>
              <div className="modal-footer" id="fb-footer">
                <a target="_blank" href={link}>
                  <button type="button" className="btn btn-sm btn-fb" id="fb-name-contact">
                    <span id="fb-contact-text">Contact {name}</span>
                    <img src={picture.data.url} id="fb-img-id" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  public renderDetail() {
    let titleMargin = {
      marginBottom: 10,
      fontSize: 28,
      fontWeight: 300
    };

    let { id, title, description, price, created_at, views, condition } = this.props.post;
    let buttons;
    const isAuthor = this.props.post.is_author;
    const isBookmarked = this.props.post.is_bookmarked;
    if (isAuthor) {
      buttons = (
        <div>
          <a className="btn btn-primary btn-lg col-md-6 col-sm-6 col-xs-6" id="ownPost-edit" onClick={() => this.editPost(id)}>Edit Post</a>
          <a className="btn btn-secondary btn-lg col-md-5 col-sm-5 col-xs-5" id="ownPost-delete" onClick={() => this.deletePost(id)}>Delete Post</a>
        </div>
      )
    } else {
      buttons = (
        <div>
          <span disabled={isBookmarked} className="btn btn-warning btn-lg col-md-2 col-sm-2 col-xs-2 bottom-margin-spacing glyphicon glyphicon-bookmark" id="bookmark-btn" onClick={() => this.checkVerifiedBookmark(id)}></span>
          <a className="btn btn-primary btn-lg col-md-9 col-sm-9 col-xs-9" id="contact-the-seller-btn" onClick={() => {this.checkVerifiedContact(id)}}>Contact the Seller</a>
        </div>
      )
    }
    return (
      <div className="col-lg-6 col-md-6 col-sm-6 absolute-height" id="detail-body">
        <h3 style={titleMargin as any}>{title}</h3>
        
        {
          views < 15 ? 
            <p><span className="glyphicon glyphicon-eye-open"></span>&nbsp;&nbsp; {views} Views </p> : 
            <p className="red"><span className="glyphicon glyphicon-fire"></span>&nbsp;&nbsp; {views} Views </p>
        }
        
        <p id="post-description">{description}</p>
        <div className="footer" id="post-detail-right-bottom">
          <h3 className="text-left">${Number(price).toLocaleString()}</h3>
          <div className="row">
            {buttons}
            {this.renderModal()}
          </div>
        </div>
      </div>
    )
  }

  public render() {
    if (!this.props.post) return null;
    let { link, category, title } = this.props.post;
    link = category.toLowerCase()

    if (category === "Lost & Found") {
      link = "lostandfound";
    } else if (category === "Course Material") {
      link = "coursematerial";
    }

    return (
      <div className="container" id="container-body">
        <SearchNavbar
          searchResult={this.props.searchResult}
          search={this.props.search}
          currentQuery={this.props.currentQuery}
          saveQuery={this.props.saveQuery}
          home={true}
        />
        <nav className="breadcrumb">
          <a className="breadcrumb-item" href="#/recent">All</a>
          <a className="breadcrumb-item" href={`#/${link}`}>{category}</a>
          <span className="breadcrumb-item active">{title && shortenString(title, 20)}</span>
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
