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
}

class MyCourses extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      myCourses: [],
      course_name: -1,
      course_number: -1
    }

    this.getMyCourses = this.getMyCourses.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  public componentWillMount() {
    this.getMyCourses();
  }

  public getMyCourses() {
    $.ajax({
      method: "GET",
      url: "api/courses",
      data: { access_token: this.props.user.auth.accessToken }
    }).then(myCourses => this.setState({ myCourses }));
  }

  public deleteCourse(e, id) {
    e.stopPropagation();

    const access_token = this.props.user.auth.access_token;
    $.ajax({
      type: "DELETE",
      url: `api/courses/${id}`,
      data: { access_token: this.props.user.auth.accessToken }
    }).then(myCourses => this.setState({ myCourses }));
  }

  public renderListItem() {
    return this.state.myCourses.map(course => (
      <tr key={course.id} >
        <td className="hidden-xs">{course.course_number}</td>
        <td className="hidden-xs" id="hide-description">{shortenString(course.course_number, 30)}</td>
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

  public renderMyCourses() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th id="th-no-caret"></th>
                  <th onClick={() => this.sortBy("course_number")} className="hidden-xs" id="hide-description">Course Number<a onClick={() => this.sortBy("course_number")} className="btn btn-xs" id="caret-container"><span className="caret" /></a></th>
                  <th onClick={() => this.sortBy("course_name")} className="hidden-xs">Course Name<a onClick={() => this.sortBy("course_name")} className="btn btn-xs" id="caret-container"><span className="caret" /></a></th>
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
              <a href="#/courses/create" className="btn btn-clear nav-button" id="responsive-create-text">
                Add course
              </a>
              <a href="#/courses/create" className="btn btn-clear nav-button" id="responsive-create-icon">
                <span className="glyphicon glyphicon-edit" aria-hidden="true" id="create-icon-button"/>
              </a>
            </div>
          </ul>
          {this.renderMyCourses()}
        </div>
      </div>
    )
  }
}

export default MyCourses;
