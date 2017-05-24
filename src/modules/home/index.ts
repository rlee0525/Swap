import { connect } from 'react-redux';
import { Dispatch } from 'react-redux';
import { IUser, IStoreState } from 'common/interfaces';
import Home from './component';

interface StateProps {
  user: IUser;
}

interface DispatchProps {
}

const mapStateToProps = (state: IStoreState, ownProp?: any): StateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): DispatchProps => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
