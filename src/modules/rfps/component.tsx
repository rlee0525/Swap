import React from 'react';
import { shortenString, timeFromNow } from 'helpers';

class Rfps extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.fetchRfps = this.fetchRfps.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.state = { rfps: [], description: -1 }
  }

  public fetchRfps() {
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/api/rfps"
    }).then(rfps => this.setState({ rfps }))
  }

  public deleteRfp(id) {
    $.ajax({
      type: "DELETE",
      url: `http://localhost:3000/api/rfps/${id}`
    }).then(data => this.fetchRfps())
  }

  public componentDidMount() {
    this.fetchRfps();
  }

  public renderListItems() {
    return this.state.rfps.map(rfp => (
      <tr key={`post${rfp.id}`}>
        <td>{shortenString(rfp.description, 30)}</td>
        <td><button type="button" className="btn btn-xs btn-danger" onClick={() => this.deleteRfp(rfp.id)}>Delete</button></td>
      </tr>
    ))
  }

  public sortBy(key) {
    let polarity = this.state[key];
    let newArray = this.state.rfps.sort(function(a, b) {
      if (a[key] < b[key]) return (-1 * polarity);
      if (a[key] > b[key]) return (1 * polarity);
      return 0;
    })
    let newPolarity = (polarity === -1 ? 1 : -1);
    this.setState({
      rfps: newArray,
      [key]: newPolarity
    });
  }

  public render() {
    return (
      <div>
        <div className="container">
          <ul className="nav nav-tabs">
            <li role="presentation"><a href="#/dashboard/posts">Posts</a></li>
            <li role="presentation"><a href="#/dashboard/bookmarks">Bookmarks</a></li>
            <li role="presentation" className="active"><a href="#/dashboard/rfps">Alerts</a></li>
            <div>
              <a href="#/rfps/create" className="btn btn-success nav-button" >Create Alert</a>
            </div>
          </ul>
          <div>
            <div className="panel panel-default">
              <div className="panel-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Description<a onClick={() => this.sortBy("description")} className="btn btn-xs" ><span className="caret" /></a></th>
                      <th className="col-xs-1">Delete</th>
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
      </div>
    );
  }
}

export default Rfps;
