import { connect } from 'react-redux';

import Terms from './component';
import { IUser } from 'common/interfaces';

interface StateProps {
  user: IUser;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(Terms);
