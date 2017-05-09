import React from 'react';

class Search extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
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
                <span className="glyphicon glyphicon-th-large"></span>
                <span className="glyphicon glyphicon-th-list"></span>
              </div>
              <table className="table table-hover hidden">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Posting Date</th>
                    <th>Condition</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mattress for Sale</td>
                    <td>Twin size mattress, 3 months old, no covers</td>
                    <td>$34</td>
                    <td>3 days ago</td>
                    <td>Brand New</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>iPhone 6 32GB Black</td>
                    <td>Brand New, unlocked</td>
                    <td>$400</td>
                    <td>4 hours ago</td>
                    <td>Used</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Econ 101</td>
                    <td>Economic Basics, barely used</td>
                    <td>$40</td>
                    <td>10 minutes ago</td>
                    <td>Like New</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Econ 101</td>
                    <td>Economic Basics, barely used</td>
                    <td>$40</td>
                    <td>10 minutes ago</td>
                    <td>Like New</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Econ 101</td>
                    <td>Economic Basics, barely used</td>
                    <td>$40</td>
                    <td>10 minutes ago</td>
                    <td>Brand New</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="thumbnail col-sm-6 col-md-4">
                  <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                  <div className="caption">
                    <span className="label label-primary">Like New</span>
                    <h3>Item title fifty characters or less. Include more.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3>$34</h3>
                    <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
                  </div>
                </div>
                <div className="thumbnail col-sm-6 col-md-4">
                  <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                  <div className="caption">
                    <span className="label label-success">Brand New</span>
                    <h3>Item title fifty characters or less. Include more.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3>$34</h3>
                    <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
                  </div>
                </div>
                <div className="thumbnail col-sm-6 col-md-4">
                  <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                  <div className="caption">
                    <span className="label label-info">Used</span>
                    <h3>Item title fifty characters or less. Include more.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3>$34 </h3>
                    <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
                  </div>
                </div>
                <div className="thumbnail col-sm-6 col-md-4">
                  <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                  <div className="caption">
                    <span className="label label-info">Used</span>
                    <h3>Item title fifty characters or less. Include more.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3>$34</h3>
                    <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
                  </div>
                </div>
                <div className="thumbnail col-sm-6 col-md-4">
                  <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                  <div className="caption">
                    <span className="label label-info">Used</span>
                    <h3>Item title fifty characters or less. Include more.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3>$34</h3>
                    <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
                  </div>
                </div>
                <div className="thumbnail col-sm-6 col-md-4">
                  <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                  <div className="caption">
                    <span className="label label-info">Used</span>
                    <h3>Item title fifty characters or less. Include more.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3>$34</h3>
                    <button type="button" className="btn btn-success btn-lg btn-block">Go to Page</button>
                  </div>
                </div>
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
