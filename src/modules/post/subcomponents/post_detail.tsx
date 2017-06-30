declare var $;

import React from 'react';
import * as moment from 'moment';
import Clipboard from 'clipboard';
import autoBind from 'react-autobind';
import { hashHistory } from 'react-router';

import { shortenString, timeFromNow } from 'helpers';
import { MapItem, LoadingSpinner } from 'common/components';
import { SearchNavbar } from 'modules/search/subcomponents';
import { createConversation } from 'modules/chat/utils';

class PostDetail extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      authorFB: null,
      address: "",
      center: null,
      view: "photo",
      isLoading: true
    };

    autoBind(this);
  }

  public componentWillMount() {
    window.scrollTo(0, 0);
  }

  public componentDidMount() {
    this.initializeClipboard();
    this.initializePost();
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null && this.props.user !== null &&
    this.props.user.auth.accessToken !== nextProps.user.auth.accessToken) {
      this.initializePost();
    }
  }

  private changeView() {
    let view = this.state.view === "photo" ? "map" : "photo";
    let post = this.props.post;
    let lat = post.lat;
    let lng = post.lng;
    let address = post.address;
    let center = { lat, lng };

    this.setState({ center, address, view });
  }

  public initializePost() {
    let accessToken;

    if (this.props.user) {
      accessToken = this.props.user.auth.accessToken;
    } else {
      accessToken = null;
    }

    const id = this.props.id;

    this.props.getPost(id, accessToken).then(
      res => { this.fetchAuthor() }
    );
  }

  public checkVerifiedContact() {
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
        }).then(() => {
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
        this.props.receivePost({is_bookmarked: false});
      });
    } else {
      $.ajax({
        method: "POST",
        url: `api/bookmarks`,
        data: { bookmark, access_token }
      }).then(res => {
        this.props.receivePost({is_bookmarked: true});
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
    let imageArray = [img_url1, img_url2, img_url3].filter(el => (el !== "" && el !== null));

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
    let imageArray = [img_url1, img_url2, img_url3].filter(el => (el !== "" && el !== null));

    if (imageArray.length !== 1) {
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
    ));

    return (
      <div className="carousel-inner" role="listbox">
        {imageArray}
      </div>
    );
  }

  public contactPerson() {
    $('#contactModal').modal("show");
  }

  public fetchAuthor() {
    (window as any).FB.api(`/${this.props.post.fb_id}?fields=email,name,link,picture`, response => {
      this.setState({ 
        authorFB: response,
        isLoading: false
      });
    });
  }

  public startConversation() {
    let { post, user } = this.props;
    let firstId = post.fb_id;
    let secondId = user.userFB.id;

    if (firstId > secondId) {
      let temp = firstId;
      firstId = secondId
      secondId = temp;
    }

    let conversationId = `${firstId}-${secondId}`;

    createConversation(conversationId, post.fb_id);
    createConversation(conversationId, user.userFB.id).then(
      () => {
        $('#contactModal').modal('hide');
        hashHistory.push(`messages?id=${conversationId}`);
      },
      err => {
        console.log(err)
        $('#contactModal').modal('hide');
        hashHistory.push(`messages?id=${conversationId}`);
      }
    );
  }

  private priceMessage() {
    if (this.props.post.category === "Housing") {
      return `I would like to rent the place at $${this.props.post.price} / month.`;
    } else if (this.props.post.category === "Lost & Found") {
      return `Thanks for posting it!`;
    } else {
      return `I would like to purchase it at $${this.props.post.price}.`
    }
  }

  private availableMessage() {
    if (this.props.post.category === "Lost & Found") {
      return "Please let me know when would be the best time to meet."
    } else {
      return "Please let me know if it's still available.";
    }
  }

  public renderModal() {
    if (!this.state.authorFB || this.state.authorFB.error) return null;

    let { name, link, picture } = this.state.authorFB;

    return (
      <div>
        <a id="contactModalTrigger" className="hidden" data-toggle="modal" data-target="#contactModal">
          Contact Modal Trigger
        </a>
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
                    <div 
                      id="purchase-msg-template" 
                      contentEditable={true} 
                      data-toggle="tooltip" 
                      data-placement="bottom" 
                      title="click to edit"
                    >
                      Hi {name.split(" ")[0]}, <br/><br/>
                      My name is {this.props.user && this.props.user.userFB.name.split(" ")[0]}.<br/>
                      &nbsp;I saw your posting on {this.props.post.title} on Swap.<br/>
                      {this.priceMessage()}<br/>
                      {this.availableMessage()}<br/>

                      link: {(window as any).localhost_url}/#/posts/{this.props.post.id}<br/><br/>

                      Thanks,<br/>
                      {this.props.user && this.props.user.userFB.name}
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-primary" 
                    data-clipboard-target="#purchase-msg-template" 
                    id="copy-template"
                  >
                    Copy Message
                  </button>
                </div>
              </div>
              <div className="modal-footer" id="fb-footer">
                <a onClick={this.startConversation} >
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

  public housingViews() {
    if (this.state.view === "photo") {
      return (
        <p className="change-view">
          <span onClick={this.changeView} id="change-view-button">
            View Map
          </span>
          &nbsp;&nbsp;&nbsp;{this.dateRange()}
        </p>
      );
    } else {
      return (
        <p className="change-view">
          <span onClick={this.changeView} id="change-view-button">
            View Photos
          </span>
          &nbsp;&nbsp;&nbsp;{this.dateRange()}
        </p>
      );
    };
  }

  public dateRange() {
    let startDate = moment(this.props.post.start_date).format("MM/DD/YY");
    let endDate = moment(this.props.post.end_date).format("MM/DD/YY");

    return <span id="date-range-housing">Available: {startDate} - {endDate}</span>;
  }

  public renderDetail() {
    let titleMargin = {
      marginBottom: 10,
      fontWeight: 300
    };
    let { id, title, description, price, created_at, views, condition, category } = this.props.post;
    let buttons;
    const isAuthor = this.props.post.is_author;
    const isBookmarked = this.props.post.is_bookmarked;

    if (isAuthor) {
      buttons = (
        <div>
          <a 
            className="btn btn-primary btn-lg col-md-6 col-sm-6 col-xs-6" 
            id="ownPost-edit" 
            onClick={() => this.editPost(id)}
          >
            Edit Post
          </a>
          <a 
            className="btn btn-secondary btn-lg col-md-5 col-sm-5 col-xs-5" 
            id="ownPost-delete" 
            onClick={() => this.deletePost(id)}
          >
            Delete Post
          </a>
        </div>
      );
    } else {
      buttons = (
        <div>
          <span 
            disabled={isBookmarked} 
            className="btn btn-warning btn-lg col-md-2 col-sm-2 col-xs-2 bottom-margin-spacing glyphicon glyphicon-bookmark" 
            id="bookmark-btn" 
            onClick={() => this.checkVerifiedBookmark(id)} 
          />
          <a 
            className="btn btn-primary btn-lg col-md-9 col-sm-9 col-xs-9" 
            id="contact-the-seller-btn" 
            onClick={this.checkVerifiedContact}
          >
            Contact the Seller
          </a>
        </div>
      );
    }
    return (
      <div className="col-lg-6 col-md-6 col-sm-6 absolute-height" id="detail-body">
        <h3 style={titleMargin as any}>{title}</h3>
        {
          views < 15 ?
            <p><span className="glyphicon glyphicon-eye-open"></span>&nbsp;&nbsp; {views} Views </p> :
            <p className="red"><span className="glyphicon glyphicon-fire"></span>&nbsp;&nbsp; {views} Views </p>
        }
        { category == "Housing" && this.housingViews() }
        <p id="post-description">{description}</p>
        <div className="footer" id="post-detail-right-bottom">
          <h3 className="text-left">${Number(price).toLocaleString()}{ category == "Housing" && " / month" }</h3>
          <div className="row">
            {buttons}
            {this.renderModal()}
          </div>
        </div>
      </div>
    );
  }

  private renderCategoryMenu(label) {
    this.props.saveQuery({category: label, page_idx: 1, query: ""});

    $('#search-query').focus();
  }

  public render() {
    if (!this.props.post) return null;
    if (this.state.isLoading) return <LoadingSpinner />;

    let { link, category, title } = this.props.post;
    link = category.toLowerCase();

    if (category === "Lost & Found") {
      link = "lostandfound";
    } else if (category === "Course Material") {
      link = "coursematerial";
    }

    return (
      <div className="container" id="container-body">
        <SearchNavbar
          user={this.props.user}
          searchResult={this.props.searchResult}
          search={this.props.search}
          currentQuery={this.props.currentQuery}
          saveQuery={this.props.saveQuery}
          home={true}
        />
        <nav className="breadcrumb">
          <a className="breadcrumb-item" onClick={() => this.renderCategoryMenu("All")} href="#/recent">All</a>
          <a className="breadcrumb-item" onClick={() => this.renderCategoryMenu(category)} href={`#/${link}`}>{category}</a>
          <span className="breadcrumb-item active">{title && shortenString(title, 20)}</span>
        </nav>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" id="detail-left">
          <div className="block p-l-0 p-t-0 p-r-0" id="small-img-padding">
            {this.state.view === "photo" ?
              (<div id="carousel-example-generic-2" className="carousel carousel-light slide" data-ride="carousel">
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
              </div>) : (<MapItem center={this.state.center} address={this.state.address}/>)}
          </div>
        </div>
        {this.renderDetail()}
      </div>
    );
  }
}

export { PostDetail };
