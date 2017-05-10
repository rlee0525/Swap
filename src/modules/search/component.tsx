import React from 'react';

import { GridView, ListView } from './subcomponents';

interface Props {
  user: object
}

interface State {
  viewType: string
}

class Search extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      viewType: 'grid'
    };
  }

  public componentDidMount() {

  }

  public render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top navbar-padded text-uppercase app-navbar">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed p-x-0" data-toggle="collapse" data-target="#navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="../">
                <span>Swap</span>
              </a>
            </div>
            <div className="navbar-collapse collapse" id="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li >
                  <a href="#">Search</a>
                </li>
                <li className="active">
                  <a href="#">Who are we?</a>
                </li>
                <li >
                    <div id="status"></div>
                    <div className="fb-login-button" data-scope="email" data-max-rows="1" data-size="large" data-button-type="continue_with" data-auto-logout-link="true" data-use-continue-as="true" data-onlogin="checkLoginState();"></div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-2 menu">
              <dl>
                <dt>Categories</dt>
                <a href=""><dd>Textbooks</dd></a>
                <a href=""><dd>Male Clothing</dd></a>
                <a href=""><dd>Female Clothing</dd></a>
                <a href=""><dd>Furniture</dd></a>
                <a href=""><dd>Electronics</dd></a>
                <a href=""><dd>Kitchenware</dd></a>
                <a href=""><dd>Games</dd></a>
              </dl>
              <div className="input-group">
                <label htmlFor="search-input">Search</label>
                <input id="search-input" type="text" className="form-control" placeholder="Course Name" />
              </div>
              <br/>
            </div>
            <div className="col-md-10">
              <div className="search-icons">
                <button className="btn btn-link"><span className="glyphicon glyphicon-th-large"></span> Grid View</button>
                <button className="btn btn-link"><span className="glyphicon glyphicon-th-list"></span> List View</button>
              </div>            
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

export default Search;
