import React from 'react';
import autoBind from 'react-autobind';
import { IUser } from 'common/interfaces';
import { LargeButton } from 'common/components';

declare var $;

interface State {
  description: string;
  errors: string[];
}

interface Props {
  user: IUser;
  receiveRfps: (rfps: any) => void;
}

class AlertForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      errors: []
    }

    autoBind(this);
  }

  public submitForm(e) {
    e.preventDefault();
    const { description } = this.state;
    $.ajax({
      method: "POST",
      url: "api/rfps",
      data: { description, access_token: this.props.user.auth.accessToken }
    }).then( post => {
      this.props.receiveRfps(post);
      $('#createAlertModal').modal('hide');
    }).fail( errors =>
      this.setState({ errors: errors.responseJSON })
    );
  }

  public renderErrors() {
    if (typeof this.state.errors === "undefined") {
      return null;
    } else {
      return this.state.errors.map((error, key) => (
        <div key={key} className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
          <span className="sr-only">Error:</span> {error}
        </div>
      ));
    }
  }

  public updateState(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  public render() {
    return (
      <div>
        <a 
          id="createAlertModalTrigger" 
          className="hidden" 
          data-toggle="modal" 
          data-target="#createAlertModal"
        >
          Email Input Modal Trigger
        </a>
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
                    <span className="input-group-addon" id="basic-addon1">
                      &nbsp;{this.state.description.length} / 50
                    </span>
                  </div>
                  <LargeButton 
                    type="Create" 
                    class="btn-primary" 
                    click={ this.submitForm }
                  />
                </form>
              </div>
              <br/>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export { AlertForm };
