import { connect } from 'react-redux';
import { Dispatch } from 'react-redux';
import { IUser, IStoreState } from 'common/interfaces';
import Dashboard from './component';

interface StateProps {
  user : IUser;
  dashboard: any; // TODO: update
}

interface DispatchProps {
}

const mapStateToProps = (state: IStoreState, ownProp?: any): StateProps => ({
  user: state.user,
  dashboard: state.dashboard
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): DispatchProps => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);