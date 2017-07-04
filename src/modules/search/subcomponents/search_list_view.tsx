declare var $;

import React from 'react';
import { merge } from 'lodash';

import { Pagination } from './';
import { LoadingSpinner } from 'common/components';
import { IPost, IUser, IChat,
         ISearchResult, ICurrentQuery } from 'common/interfaces';
import { shortenString,
         timeFromNow,
         getCategory } from 'helpers';


interface Props {
  searchResult: ISearchResult;
  search: (query: object) => JQueryXHR;
  saveQuery: any;
  currentQuery: ICurrentQuery;
  user: IUser;
  chat: IChat;
  fetchFirebaseConversations: any;
}

class SearchListView extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.state = {
      price: -1,
      updated_at: 1,
      views: 1,
      isLoading: true
    };

    this.sort_by = this.sort_by.bind(this);
  }

  public componentWillMount() {
    let nextQuery = this.props.currentQuery;
    
    if (this.props.currentQuery.category === "My Course Material" && this.props.user) {
      const access_token = this.props.user.auth.accessToken;
      nextQuery = merge({}, nextQuery, {access_token});
      this.props.search(nextQuery).then(
        res => this.setState({ isLoading: false })
      );
    } else {
      this.props.search(nextQuery).then(
        res => this.setState({ isLoading: false })
      );
    }

    this.props.user && this.props.fetchFirebaseConversations(this.props.user);
  }

  renderListItem(post: IPost, idx: number) {
    return (
      <tr key={idx} onClick={() => window.location.href = `#/posts/${post.id}`}>
        <td>{shortenString(post.title, 30)}</td>
        <td className="hidden-xs hidden-sm">{shortenString(post.description, 30)}</td>
        <td>${Number(post.price).toLocaleString()}</td>
        <td className="hidden-xs">{timeFromNow(post.updated_at)}</td>
        <td className="hidden-xs">{post.views}</td>
      </tr>
    );
  }

  public sort_by(sort_by: string) {
    const polarity = this.state[sort_by] * -1;
    const currentQuery = this.props.currentQuery;
    this.props.saveQuery({sort_by, polarity});
    let nextQuery = merge({}, currentQuery, {sort_by, polarity})

    if (this.props.currentQuery.category === "My Course Material" && this.props.user) {
      const access_token = this.props.user.auth.accessToken;
      nextQuery = merge({}, nextQuery, {access_token});
      this.props.search(nextQuery);
    } else {
      this.props.search(nextQuery);
    }

    this.setState({[sort_by]: polarity});
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loading-grid-list">
          <LoadingSpinner />
        </div>
      )
    };

    let results;
    
    if (this.props.searchResult.posts) {
      results = this.props.searchResult.posts.map((post, idx) => this.renderListItem(post, idx));
    } else {
      results = (
        <LoadingSpinner />
      );
    }

    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th className="hidden-xs hidden-sm">Description</th>
              <th onClick={() => this.sort_by("price")}>
                Price
                <a className="btn btn-xs" id="caret-container">
                  <span className="caret" />
                </a>
              </th>
              <th onClick={() => this.sort_by("updated_at")} className="hidden-xs">
                Posted
                <a className="btn btn-xs" id="caret-container">
                  <span className="caret" />
                </a>
              </th>
              <th onClick={() => this.sort_by("views")} className="hidden-xs">
                Views
                <a className="btn btn-xs" id="caret-container">
                  <span className="caret" />
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            { results }
          </tbody>
        </table>
      </div>
    )
  }
}

export { SearchListView };
