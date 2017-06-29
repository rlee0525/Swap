import React from 'react';
import { IUser } from 'common/interfaces';
import { shortenString, timeFromNow } from 'helpers';
import { TableHeaders, LoadingSpinner, SmallButton } from 'common/components';

declare var $;

interface IRfps {
  id: number;
  description: string;
}

interface State {
  rfps: object[];
  description: number;
}

interface Props {
  user: IUser;
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
            let { deleteRfps, user } = that.props;
            
            deleteRfps(id, user.auth.accessToken).then(
              () => that.setState({ rfps: that.props.rfps.list })
            );
          },
          Cancel: function() {
            $(this).dialog("close");
          }
        }
      });
    });
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
    if (!this.props.rfps.fetched) return <LoadingSpinner />;
    if (this.props.rfps.list.length === 0) return <tr><td>No alerts added.</td></tr>;

    return (
      this.state.rfps.map((rfp : IRfps) => (
        <tr key={`post${rfp.id}`}>
          <td>{shortenString(rfp.description, 30)}</td>
          <td id="rfp-delete">
            <SmallButton 
              type="Delete" 
              class="btn-secondary" 
              click={(e) => this.deleteRfp(e, rfp.id)}
            />
          </td>
        </tr>
      ))
    );
  }

  public render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="dashboard-description">
            Add custom alerts to get emails whenever a post related to the created keywords is created.
          </div>
          <div className="panel-body">
            <table className="table table-hover">
              <TableHeaders 
                context={this} 
                array={this.state.rfps} 
                headers={["description"]} 
                isFirstColumnPlaceholder={false} 
              />
              <tbody>
                {this.renderListItems()}
              </tbody>
            </table>
          </div>
        </div>

        <div className="no-display" id="dialog-confirm">
          Delete this alert?
        </div> 
      </div>
    );
  }
}

export { Rfps };
