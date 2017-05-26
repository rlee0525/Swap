import React from 'react';
import { shortenString, timeFromNow } from 'helpers';

declare var $;

interface course {
  id: number;
  course_name: string;
  course_number: string;
  university_id: number;
}

interface Props {
  user: any;
}

interface State {
  myCourses: course [];
  course_name: any;
  course_number: any;
  description: string;
  errors: any [];
}

class MyCourses extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      myCourses: [],
      course_name: -1,
      course_number: -1,
      description: "",
      errors: undefined
    }

    this.getMyCourses = this.getMyCourses.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.updateState = this.updateState.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.renderMyCourses = this.renderMyCourses.bind(this);
  }

  public componentWillMount() {
    this.getMyCourses();
  }

  public getMyCourses() {
    $.ajax({
      method: "GET",
      url: "api/my_courses",
      data: { access_token: this.props.user.auth.accessToken }
    }).then(myCourses => this.setState({ myCourses }));
  }

  public deleteCourse(e, id) {
    e.stopPropagation();

    const access_token = this.props.user.auth.access_token;
    $.ajax({
      type: "DELETE",
      url: `api/my_courses/${id}`,
      data: { access_token: this.props.user.auth.accessToken }
    }).then(myCourses => this.setState({ myCourses }));
  }

  public renderListItem() {
    return this.state.myCourses.map(course => (
      <tr key={course.id} >
        <td>{course.course_number}</td>
        <td>{shortenString(course.course_name, 30)}</td>
        <td><button type="button" id="action-button" className="btn btn-xs btn-secondary" onClick={(e) => this.deleteCourse(e, course.id)}>Delete</button></td>
      </tr>
    ))
  }

  public sortBy(key) {
    let polarity = this.state[key];
    let newArray = this.state.myCourses.sort(function(a, b) {
      if (a[key] < b[key]) return (-1 * polarity);
      if (a[key] > b[key]) return (1 * polarity);
      return 0;
    });

    let newPolarity = (polarity === -1 ? 1 : -1);
    this.setState({
      myCourses: newArray,
      [key]: newPolarity
    });
  }

  public createAlert() {
    $('#createMyCourse').modal('show');
  }

  public updateState(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  public submitForm(e) {
    e.preventDefault();
    const { description } = this.state;
    $.ajax({
      method: "POST",
      url: "api/my_courses",
      data: { course_number: description, access_token: this.props.user.auth.accessToken }
    }).then( post => {
      this.getMyCourses();
      $('#createMyCourse').modal('hide');
    }).fail( errors =>
      this.setState({ errors })
    );
  }

  public renderMyCourses() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th onClick={() => this.sortBy("course_number")}>Course Number<a onClick={() => this.sortBy("course_number")} className="btn btn-xs" id="caret-container"><span className="caret" /></a></th>
                  <th onClick={() => this.sortBy("course_name")}>Course Name<a onClick={() => this.sortBy("course_name")} className="btn btn-xs" id="caret-container"><span className="caret" /></a></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.renderListItem()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="container">
          <ul className="nav nav-tabs">
            <li role="presentation" id="dashboard-nav-title"><a href="#/dashboard/posts">Posts</a></li>
            <li role="presentation" id="dashboard-nav-title"><a href="#/dashboard/bookmarks">Bookmarks</a></li>
            <li role="presentation" id="dashboard-nav-title"><a href="#/dashboard/rfps">Alerts</a></li>
            <li role="presentation" id="dashboard-nav-title" className="active"><a href="#/dashboard/mycourses">My Courses</a></li>
            <div>
              <a onClick={() => this.createAlert()} className="btn btn-clear nav-button" id="responsive-create-text">
                Create Alert
              </a>
              <a onClick={() => this.createAlert()} className="btn btn-clear nav-button" id="responsive-create-icon">
                <span className="glyphicon glyphicon-bell" aria-hidden="true" id="create-icon-button"/>
              </a>

              <a id="createAlertModalTrigger" className="hidden" data-toggle="modal" data-target="#createMyCourse">My Course Modal</a>
              <div className="modal fade" id="createMyCourse" tabIndex={-1} role="dialog"
                    aria-labelledby="authModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header" id="auth-modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h3 className="modal-title" id="authModalLabel">Add Course</h3>
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
                            placeholder="Course Number"
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
          {this.renderMyCourses()}
        </div>
      </div>
    )
  }
}

export default MyCourses;
