import { connect } from 'react-redux';
import { IUser } from 'interfaces';
import Home from './component';

interface StateProps {
  user: IUser;
}

interface DispatchProps {
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
