import React from 'react';
import { shortenString, timeFromNow } from 'helpers';

import { NavTabs } from './subcomponents/nav_tabs';

interface RFP {
  id: number;
  description: string;
}

interface State {
  rfps: object[];
  description: number;
}

interface Props {
  user: any;
}

class Rfps extends React.Component <Props, State> {
  constructor(props : any) {
    super(props);
    this.state = {
      rfps: [],
      description: -1
    };

    this.fetchRfps = this.fetchRfps.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  public fetchRfps() {
    $.ajax({
      method: "GET",
      url: "api/rfps",
      data: { access_token: this.props.user.auth.accessToken }
    }).then(
      rfps => this.setState({ rfps })
    );
  }

  public deleteRfp(id) {
    $.ajax({
      type: "DELETE",
      url: `api/rfps/${id}`,
      data: { access_token: this.props.user.auth.accessToken }
    }).then(
      data => this.fetchRfps()
    );
  }

  public componentDidMount() {
    this.fetchRfps();
  }

  public renderListItems() {
    return this.state.rfps.map((rfp : RFP) => (
      <tr key={`post${rfp.id}`}>
        <td>{shortenString(rfp.description, 30)}</td>
        <td>
          <button
            type="button"
            className="btn btn-xs btn-danger"
            onClick={() => this.deleteRfp(rfp.id)}
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
    return (
      <div>
        <div className="container">
          <NavTabs />
          <div className="panel panel-default">
            <div className="rfp-description" style={{ width: "100%", padding: "15px" }}>
              Add custom alerts to get emails whenever a post related to the created keywords is created.
            </div>
            <div className="panel-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>
                      <a onClick={() => this.sortBy("description")} className="btn btn-xs">
                        Keywords
                        <span className="caret"/>
                      </a>
                    </th>
                  </tr>
                </thead>
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

export default Rfps;
