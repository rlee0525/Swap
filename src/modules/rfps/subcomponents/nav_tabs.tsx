import React from 'react';
import { Link } from 'react-router';

interface State {
  description: string;
  errors: any;
}

interface Props {

}

class NavTabs extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      description: "",
      errors: undefined
    };

    this.submitForm = this.submitForm.bind(this);
    this.updateState = this.updateState.bind(this);
    this.createAlert = this.createAlert.bind(this);
  }

  public createAlert() {
    $('#createAlertModal').modal('show');
  }

  public updateState(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  public submitForm(e) {
    e.preventDefault();
    const { description } = this.state;
    $.ajax({
      method: "POST",
      url: "api/rfps",
      data: { description, access_token: this.props.user.auth.accessToken }
    }).then( post => {
      this.props.fetchRfps();
      $('#createAlertModal').modal('hide');
    }).fail( errors => 
      this.setState({ errors })
    );
  }

  public renderErrors() {
    if (typeof this.state.errors === "undefined") {
      return null;
    } else {
      return this.state.errors.responseJSON.map((error, key) => (
        <div key={key} className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span className="sr-only">Error:</span> {error}
        </div>
      ));
    }
  }

  public render() {
    return (
      <ul className="nav nav-tabs">
        <li role="presentation" id="dashboard-nav-title">
          <Link to="dashboard/posts">Posts</Link>
        </li>
        <li role="presentation" id="dashboard-nav-title">
          <Link to="dashboard/bookmarks">Bookmarks</Link>
        </li>
        <li role="presentation" id="dashboard-nav-title" className="active">
          <Link to="dashboard/rfps">Alerts</Link>
        </li>
        <div>
          <button className="btn btn-clear nav-button" onClick={() => this.createAlert()}>
            Create Alert
          </button>
          

          <a id="createAlertModalTrigger" className="hidden" data-toggle="modal" data-target="#createAlertModal">Email Input Modal Trigger</a>
          <div className="modal fade" id="createAlertModal" tabIndex={-1} role="dialog"
                aria-labelledby="authModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header" id="auth-modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h3 className="modal-title" id="authModalLabel">Create a new alert</h3>
                </div>
                <div className="modal-body text-center" id="fb-modal-body">
                  <form onSubmit={ this.submitForm }>
                    <div className="form-group input-group" id="email-error-div">
                      <input 
                        type="text" 
                        maxLength={50}
                        value={this.state.description}
                        onChange={this.updateState}
                        className="form-control" 
                        id="description"
                        placeholder="Keyword (e.g. Desk)" 
                        aria-describedby="basic-addon2"
                      />
                      <span className="input-group-addon" id="basic-addon1">&nbsp;{50 - this.state.description.length} characters left</span>
                    </div>
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={ this.submitForm }>Create</button>
                  </form>
                </div>
                <br/>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>


        </div>
      </ul>
    );
  }
}

export { NavTabs };