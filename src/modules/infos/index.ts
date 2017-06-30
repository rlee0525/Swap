import { connect } from 'react-redux';

import Infos from './component';
import { IUser } from 'common/interfaces';

interface StateProps {
  user: IUser;
}

const mapStateToProps = (state: any): StateProps => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(Infos);
