import React from 'react';
import { shortenString, timeFromNow } from 'helpers';
import { TableHeaders } from 'common/components';

interface IRfps {
  id: number;
  description: string;
}

interface State {
  rfps: object[];
  description: number;
}

interface Props {
  user: any;
  rfps: {
    fetched: boolean;
    list: IRfps[];
  },
  fetchRfps : (accessToken: string) => JQueryPromise<void>;
  deleteRfps : (id: number, accessToken: string) => JQueryPromise<void>;
}

class Rfps extends React.Component <Props, State> {
  constructor(props : any) {
    super(props);
    this.state = {
      rfps: [],
      description: -1
    };
  }

  public deleteRfp(e, id) {
    e.stopPropagation();

    let { deleteRfps, user } = this.props;

    deleteRfps(id, user.auth.accessToken).then(
      () => this.setState({ rfps: this.props.rfps.list })
    );
  }

  public componentDidMount() {
    let { rfps, user, fetchRfps } = this.props;
    if (!rfps.fetched) {
      fetchRfps(user.auth.accessToken).then(
        () => this.setState({ rfps: this.props.rfps.list })
      );
    } else {
      this.setState({ rfps: this.props.rfps.list });
    }
  }

  public componentWillReceiveProps(newProps) {
    if (newProps.rfps.list.length !== this.props.rfps.list.length) {
      this.setState({ rfps: newProps.rfps.list })
    }
  }

  public renderListItems() {
    if (this.props.rfps.fetched === false) {
      return (
        <div className="showbox">
          <div className="loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
          </div>
        </div>
      );
    };

    if (this.props.rfps.list.length === 0) {
      return (
        <tr>
          <td>Currently, you do not have any alerts setup.  Please add alerts.</td>
        </tr>
      );
    };

    return (
      this.state.rfps.map((rfp : IRfps) => (
        <tr key={`post${rfp.id}`}>
          <td>{shortenString(rfp.description, 30)}</td>
          <td id="rfp-delete">
            <button
              type="button"
              className="btn btn-xs btn-danger"
              onClick={(e) => this.deleteRfp(e, rfp.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    );
  }

  public render() {
    let headers = ["description"];

    return (
      <div>
        <div className="panel panel-default">
          <div className="rfp-description">
            Add custom alerts to get emails whenever a post related to the created keywords is created.
          </div>
          <div className="panel-body">
            <table className="table table-hover">
              <TableHeaders context={this} array={this.state.rfps} headers={headers} isFirstColumnPlaceholder={false} />

              <tbody>
                {this.renderListItems()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export { Rfps };
