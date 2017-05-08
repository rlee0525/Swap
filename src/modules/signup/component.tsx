import React from 'react';

class SignUp extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      current_sf: 1
    };

    this.onClickFB = this.onClickFB.bind(this);
    this.onClickEmail = this.onClickEmail.bind(this);
  }

  public componentDidMount() {
    // TODO: check what step the user is in and render accordingly.
  }

  public onClickFB() {
    event.preventDefault();

    let currentForm = document.getElementById(`sf-1`);
    currentForm.classList.add('hide');

    let nextForm = document.getElementById(`sf-2`);
    nextForm.classList.add('show');

    let nextStep = document.getElementById(`pb-2`);
    let current_sf = 2;

    nextStep.classList.add("active");
    this.setState({ current_sf });
  }

  public onClickEmail() {
    event.preventDefault();

    let currentForm = document.getElementById(`sf-2`);
    currentForm.classList.remove('show');

    let nextForm = document.getElementById(`sf-3`);
    nextForm.classList.add('show');

    let nextStep = document.getElementById(`pb-3`);
    let current_sf = 3;

    nextStep.classList.add("active");
    this.setState({ current_sf });
  }

  public render() {
    console.log(this.props);

    return (
      <div className="signup-form-container">
        <div id="signup-form">
          <ul id="progressbar">
            <li id="pb-1" className="active">Facebook</li>
            <li id="pb-2">Email</li>
            <li id="pb-3">Verification</li>
          </ul>

          <div id="sf-1">
            <h2 className="sf-ti tle">Create your account</h2>
            <button id="facebook-login" onClick={this.onClickFB}>Facebook</button>
          </div>

          <div id="sf-2">
            <h2 className="sf-title">Enter university email</h2>
            <input type="text" name="edu-email" placeholder="example@berkeley.edu" />
            <button onClick={this.onClickEmail}>Next</button>
          </div>

          <div id="sf-3">
            <h2 className="sf-title">Verify your email</h2>
            <button className="sf-resend">Resend email </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
