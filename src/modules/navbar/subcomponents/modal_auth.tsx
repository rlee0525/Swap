import React from 'react';

class ModalAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div id="status"></div>
        <div className="fb-login-button" data-scope="email" data-max-rows="1" data-size="large" data-button-type="continue_with" data-auto-logout-link="true" data-use-continue-as="true" data-onlogin="checkLoginState();"></div>
      </div>
    );
  }
}

export { ModalAuth };
