import React from 'react';
import autoBind from 'react-autobind';
import { IUser } from 'common/interfaces';
import { shortenString, timeFromNow } from 'helpers';
import { LoadingSpinner, 
         SmallButton, 
         LargeButton } from 'common/components';

declare var $;

interface ICourse {
  id: number;
  course_name: string;
  course_number: string;
  university_id: number;
}

interface Props {
  user: IUser;
  courses: {
    fetched: boolean;
    list: ICourse[];
  };
  myCourses: {
    fetched: boolean;
    list: ICourse[];
  };
  fetchCourses : () => JQueryPromise<void>;
  fetchMyCourses: (accessToken: string) => JQueryPromise<void>;
  deleteMyCourse: (id: number, accessToken: string) => JQueryPromise<void>;
  postMyCourse : (description: string, accessToken: string) => JQueryPromise<void>;
}

interface State {
  courseDescription: string;
  errors: any [];
}

class MyCourses extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      courseDescription: "",
      errors: []
    };

    autoBind(this);
  }

  public componentDidMount() {
    this.props.fetchCourses();
    this.props.fetchMyCourses(this.props.user.auth.accessToken).then(
      () => this.autoComplete()
    );
  }

  public deleteCourse(e, id) {
    e.stopPropagation();
    
    let that = this;

    $(function() {
      $("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Yes": function() {
            $(this).dialog("close");
            that.props.deleteMyCourse(id, that.props.user.auth.accessToken);
          },
          Cancel: function() {
            $(this).dialog("close");
          }
        }
      });
    });
  }

  public updateState(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  public submitForm(e) {
    e.preventDefault();

    const { courseDescription } = this.state;
    const access_token = this.props.user.auth.accessToken;

    this.props.postMyCourse(courseDescription, access_token).then(() => {
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
        }).then(data => done({ "suggestions": data }));
      },
      onSelect: function (suggestion) {
        that.setState({courseDescription: suggestion.value});
      }
    });
  }

  public renderMyCourses() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="dashboard-description">
            Add your courses to easily search for related posts.
          </div>
          <div className="panel-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="hidden-xs no-pointer">Course Number</th>
                  <th className="hidden-xs no-pointer">Course Name</th>
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
    if (!this.props.myCourses.fetched) return <LoadingSpinner />;
    if (this.props.myCourses.list.length === 0) return <tr><td colSpan={2}>No courses added.</td></tr>;

    return (
      this.props.myCourses.list.map(course => (
        <tr key={course.id} className="no-pointer">
          <td>{course.course_number}</td>
          <td className="hidden-xs">{course.course_name}</td>
          <td>
            <SmallButton 
              type="Delete" 
              class="btn-secondary"
              click={(e) => this.deleteCourse(e, course.id)}
            />
          </td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <div>
        <a 
          id="createAlertModalTrigger" 
          className="hidden" 
          data-toggle="modal" 
          data-target="#createMyCourse"
        />
        
        <div className="modal fade" id="createMyCourse" tabIndex={-1} role="dialog"
              aria-labelledby="authModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="auth-modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h3 className="modal-title" id="authModalLabel">Add a new course</h3>
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
                    <span className="input-group-addon" id="basic-addon1">
                      &nbsp;{this.state.courseDescription.length} / 50
                    </span>
                  </div>
                  <LargeButton
                    type="Create"
                    class="btn-primary"
                    click={this.submitForm}
                  />
                </form>
              </div>
              <br/>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
        {this.renderMyCourses()}

        <div className="no-display" id="dialog-confirm">
          Delete this course?
        </div> 
      </div>
    )
  }
}

export { MyCourses };
