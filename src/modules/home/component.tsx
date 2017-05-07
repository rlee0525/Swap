import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        Hi
        <div className="fb-login-button" data-max-rows="1" data-size="large"
             data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false">
        </div>
      </div>
    )
  }
}

export default Home;
