import React from 'react';

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

  }

  public componentDidMount() {
    ((d, s, id) => {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.setAttribute('src', "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=1843174039341965");
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  public render() {
    console.log(this.props);

    return (
      <div>
        Hi
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-button-type="continue_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="false"
        />
      </div>
    );
  }
}

export default Home;
