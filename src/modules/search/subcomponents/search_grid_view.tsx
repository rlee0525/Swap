import React from 'react';
import { shortenString } from 'helpers';

interface Props {
  search: object[];
}

interface State {

}

class SearchGridView extends React.Component<Props, State> {

  buttonClass(condition) {
    if (condition === 'New') {
      return 'success';
    } else if (condition === 'Like New') {
      return 'primary';
    } else {
      return 'info';
    }
  }

  renderGridItem(post) {
    return (
      <div className="thumbnail col-sm-6 col-md-4" key={Math.random() * post.id}>
        <img src={post.img_url1} alt={post.title} />
        <div className="caption">
          <span className={`label label-${this.buttonClass(post.condition)}`}>{post.condition}</span>
          <h3>{post.title}</h3>
          <p>{shortenString(post.description, 160)}</p>
          <h3>${Number(post.price).toLocaleString()}</h3>
          <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
        </div>
      </div>
    )
  }
  
  render() {

    return (
      <div className="row">
        { this.props.searchResult ? this.props.searchResult.map(post => this.renderGridItem(post)) : null }
        <div className="thumbnail col-sm-6 col-md-4">
          <img
            src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg"
            alt="..."/>
          <div className="caption">
            <span className="label label-primary">Like New</span>
            <h3>Item title fifty characters or less. Include more.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>$34</h3>
            <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
          </div>
        </div>
        <div className="thumbnail col-sm-6 col-md-4">
          <img
            src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg"
            alt="..."/>
          <div className="caption">
            <span className="label label-success">Brand New</span>
            <h3>Item title fifty characters or less. Include more.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>$34</h3>
            <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
          </div>
        </div>
        <div className="thumbnail col-sm-6 col-md-4">
          <img
            src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg"
            alt="..."/>
          <div className="caption">
            <span className="label label-info">Used</span>
            <h3>Item title fifty characters or less. Include more.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>$34
            </h3>
            <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
          </div>
        </div>
        <div className="thumbnail col-sm-6 col-md-4">
          <img
            src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg"
            alt="..."/>
          <div className="caption">
            <span className="label label-info">Used</span>
            <h3>Item title fifty characters or less. Include more.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>$34</h3>
            <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
          </div>
        </div>
        <div className="thumbnail col-sm-6 col-md-4">
          <img
            src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg"
            alt="..."/>
          <div className="caption">
            <span className="label label-info">Used</span>
            <h3>Item title fifty characters or less. Include more.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>$34</h3>
            <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
          </div>
        </div>
        <div className="thumbnail col-sm-6 col-md-4">
          <img
            src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg"
            alt="..."/>
          <div className="caption">
            <span className="label label-info">Used</span>
            <h3>Item title fifty characters or less. Include more.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>$34</h3>
            <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
          </div>
        </div>
      </div>
    );
  }
}

export { SearchGridView };