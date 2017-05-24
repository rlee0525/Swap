import { connect } from 'react-redux';
import { Dispatch } from 'react-redux';
import { IUser, IStoreState } from 'common/interfaces';
import Home from './component';
import { search } from 'modules/search/actions';

interface StateProps {
  user : IUser;
}

interface DispatchProps {
  search : (query: object) => void;
}

const mapStateToProps = (state: IStoreState, ownProp?: any): StateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): DispatchProps => ({
  search: query => dispatch(search(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
