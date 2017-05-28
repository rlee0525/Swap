import React from 'react';
import { shortenString, timeFromNow } from 'helpers';
import { TableHeaders } from 'common/components';

// import { NavTabs } from './subcomponents';

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

    this.sortBy = this.sortBy.bind(this);
  }

  public deleteRfp(e, id) {
    e.stopPropoagation();

    let { deleteRfps, user } = this.props;

    deleteRfps(id, user.auth.accessToken).then(
      () => this.setState({ rfps: this.props.rfps.list })
    );
  }

  public componentWillMount() {
    let { rfps, user, fetchRfps } = this.props;
    if (!rfps.fetched) {
      fetchRfps(user.auth.accessToken).then(
        () => this.setState({ rfps: this.props.rfps.list })
      );
    }
  }

  public renderListItems() {
    return this.state.rfps.map((rfp : IRfps) => (
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
    ));
  }

  public sortBy(key) {
    let polarity : number = this.state[key];
    let newArray : object[] = this.state.rfps.sort(function (a, b) {
      if (a[key] < b[key]) return (-1 * polarity);
      if (a[key] > b[key]) return (1 * polarity);
      return 0;
    });

    let newPolarity : number = -1 * polarity;
    this.setState({rfps: newArray, [key]: newPolarity});
  }

  public render() {
    let headers = ["description"];
    return (
      <div>
        <div className="container">
          {/*<NavTabs user={this.props.user} fetchRfps={this.fetchRfps} />*/}
          <div className="panel panel-default">
            <div className="rfp-description">
              Add custom alerts to get emails whenever a post related to the created keywords is created.
            </div>
            <div className="panel-body">
              <table className="table table-hover">
                <TableHeaders context={this} array={this.state.rfps} headers={headers} />
              
                <tbody>
                  {this.renderListItems()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Rfps };
