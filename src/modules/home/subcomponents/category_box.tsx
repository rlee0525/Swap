import React from 'react';
import { Link } from 'react-router';
import autoBind from 'react-autobind';

import { IUser, IChat } from 'common/interfaces';

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
  user: IUser;
  chat: IChat;
  fetchFirebaseConversations: any;
}

class CategoryBox extends React.Component<Props, {}> {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  private fetchConversation(e: any) {
    if (this.props.user) {
      let { user } = this.props;
      const accessToken = user.auth.accessToken;

      $.ajax({
        method: "GET",
        url: `api/users/${accessToken}`
      }).then(obj => {
        if (obj.edu_email_confirmed) {
          this.props.fetchFirebaseConversations(user);
        }
      }).fail(() => FB.logout(res => console.log(res)));
    }
  }

  public render() {
    let { viewDescription, hideDescription, category } = this.props;

    return (
      <div className="col-xxs-12 col-xs-6 col-md-4">
        <Link 
          to={category.link} 
          className="thumbnail" 
          onMouseOver={viewDescription} 
          onMouseOut={hideDescription}
          onClick={this.fetchConversation}
        >
          <img className="thumbnail-image" src={category.image} alt="..."/>
          <div className="carousel-caption">
            <h3 className="category-title">{category.title}</h3>
            <p className="category-description hide">{category.description}</p>
          </div>
        </Link>
      </div>
    )
  }
}

export { CategoryBox };
