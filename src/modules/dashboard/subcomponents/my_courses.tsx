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
  courseDescription: string;
  course: string;
  errors: any [];
  courses: any [];
}

class MyCourses extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      myCourses: [],
      course_name: -1,
      course_number: -1,
      courseDescription: "",
      course: "",
      errors: undefined,
      courses: []
    }

    this.getMyCourses = this.getMyCourses.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.updateState = this.updateState.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.renderMyCourses = this.renderMyCourses.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
  }

  public componentWillMount() {
    this.getMyCourses();
    this.fetchAllCourses();
  }

  public getMyCourses() {
    $.ajax({
      method: "GET",
      url: "api/my_courses",
      data: { access_token: this.props.user.auth.accessToken }
    }).then(myCourses => this.setState({ myCourses }));
  }

  public fetchAllCourses() {
    $.ajax({
      method: "GET",
      url: "api/courses"
    }).then(courses => {
      this.setState({ courses })
      this.autoComplete()
    }).fail(errors => {
      this.setState({ errors: errors.responseJSON })
    })
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

  public updateState(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  public submitForm(e) {
    e.preventDefault();
    const { courseDescription } = this.state;
    $.ajax({
      method: "POST",
      url: "api/my_courses",
      data: { course_number: courseDescription, access_token: this.props.user.auth.accessToken }
    }).then( post => {
      this.getMyCourses();
      $('#createMyCourse').modal('hide');
    }).fail( errors =>
      this.setState({ errors })
    );
  }

  public autoComplete() {
    let that = this;
    let input = function () { return  { search: $('#courseDescription').val() }};
    $('#courseDescription').devbridgeAutocomplete({
      lookup: function (query, done) {
        $.ajax({
          method: 'GET',
          url: 'api/courses',
          data: input()
        }).then(data => done({ "suggestions": data }))
      },
      onSelect: function (suggestion) {
        that.setState({courseDescription: suggestion.value})
      }
    });
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
                  <th className="hidden-xs" onClick={() => this.sortBy("course_name")}>Course Name<a onClick={() => this.sortBy("course_name")} className="btn btn-xs" id="caret-container"><span className="caret" /></a></th>
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

  public renderListItem() {
    return this.state.myCourses.map(course => (
      <tr key={course.id} >
        <td>{course.course_number}</td>
        <td className="hidden-xs">{course.course_name}</td>
        <td><button type="button" id="action-button" className="btn btn-xs btn-secondary" onClick={(e) => this.deleteCourse(e, course.id)}>Delete</button></td>
      </tr>
    ))
  }

  render() {
    return (
      <div>
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
                      value={this.state.courseDescription}
                      onChange={this.updateState}
                      className="form-control"
                      id="courseDescription"
                      placeholder="Course Number"
                      aria-describedby="basic-addon2"
                    />
                    <span className="input-group-addon" id="basic-addon1">&nbsp;{50 - this.state.courseDescription.length} characters left</span>
                  </div>
                  <button type="button" className="btn btn-primary btn-lg btn-block" onClick={ this.submitForm }>Create</button>
                </form>
              </div>
              <br/>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
        {this.renderMyCourses()}
      </div>
    )
  }
}

export { MyCourses };
