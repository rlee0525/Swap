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
