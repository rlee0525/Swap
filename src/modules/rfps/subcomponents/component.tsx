import React from 'react';

interface State {
  description: string;
  errors: any;
}

interface Props {

}

class RfpForm extends React.Component<any, State> {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      errors: undefined
    };

    this.submitForm = this.submitForm.bind(this);
    this.updateState = this.updateState.bind(this);
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
    }).then(
      post => this.props.router.replace(`dashboard/rfps`)
    ).fail(
      errors => this.setState({ errors })
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
      <div>
        <div className="container">
        {this.renderErrors()}
        <h1>Create a New Alert</h1>
          <form className="form-horizontal" onSubmit={this.submitForm}>
            <div className="form-group">
              <label htmlFor="inputTitle3" className="col-sm-3 control-label">
                Description
              </label>

              <div className="col-sm-9 input-group" >
                <input 
                  maxLength={50}
                  value={this.state.description}
                  onChange={this.updateState}
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Title"
                />
                <span className="input-group-addon" id="basic-addon1">
                  &nbsp;{50 - this.state.description.length} characters left
                </span>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <button onClick={this.submitForm} type="button" className="btn btn-success btn-lg btn-block">
                  {typeof this.props.postData === "undefined" ? "Create" : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RfpForm;
