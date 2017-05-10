const Footer = () => (
  <div className="block app-block-footer">
    <div className="container">
      <div className="row">
        <div className="col-sm-2 m-b">
          <ul className="list-unstyled list-spaced">
            <li>
              <h6 className="text-uppercase">Products</h6>
            </li>
            <li>Todo</li>
            <li>Calendario</li>
            <li>Email Town</li>
            <li>Pomodorotary</li>
            <li>ChillTower</li>
          </ul>
        </div>
        <div className="col-sm-2 m-b">
          <ul className="list-unstyled list-spaced">
            <li>
              <h6 className="text-uppercase">Extras</h6>
            </li>
            <li>AutotuneU</li>
            <li>Freestyler</li>
            <li>Chillaxation</li>
          </ul>
        </div>
        <div className="col-sm-2 m-b">
          <ul className="list-unstyled list-spaced">
            <li>
              <h6 className="text-uppercase">Support</h6>
            </li>
            <li>Online Support</li>
            <li>Telephone Sales</li>
            <li>Help Desk</li>
            <li>Workshops</li>
          </ul>
        </div>
        <div className="col-sm-6">
          <h6 className="text-uppercase">About</h6>
          <p>Shoutout to Invision team for creating the
            <a href="http://www.invisionapp.com/do">Do UI kit</a>
            that we used to fake our app screenshots. Also to the Dribbble community for
            providing phone mockups that look amazing.</p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;