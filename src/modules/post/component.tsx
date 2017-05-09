import React from 'react';

class Post extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {

  }

  public render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail">
                <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                <div className="carousel-caption">
                  <h3>Category A</h3>
                  <p>Cool things here</p>
                </div>
              </a>
            </div>
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail">
                <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                <div className="carousel-caption">
                  <h3>Category A</h3>
                  <p>Cool things here</p>
                </div>
              </a>
            </div>
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail">
                <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                <div className="carousel-caption">
                  <h3>Category A</h3>
                  <p>Cool things here</p>
                </div>
              </a>
            </div>
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail">
                <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                <div className="carousel-caption">
                  <h3>Category A</h3>
                  <p>Cool things here</p>
                </div>
              </a>
            </div>
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail">
                <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                <div className="carousel-caption">
                  <h3>Category A</h3>
                  <p>Cool things here</p>
                </div>
              </a>
            </div>
            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail">
                <img src="http://pre15.deviantart.net/7b1e/th/pre/i/2014/180/7/1/natalie_portman___keira_knightley_by_thatnordicguy-d7og2jx.jpg" alt="..."/>
                <div className="carousel-caption">
                  <h3>Category A</h3>
                  <p>Cool things here</p>
                </div>
              </a>
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

export default Post;
