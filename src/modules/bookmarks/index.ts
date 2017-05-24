import { connect, Dispatch } from 'react-redux';
import { IStoreState, IUser } from 'common/interfaces';
import Bookmarks from './component';

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
  null
)(Bookmarks);
