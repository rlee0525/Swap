import { connect } from 'react-redux';
import PostForm from './component';

interface StateProps {
  user: any;
}

const mapStateToProps = (state: any, ownProp?: any): StateProps => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(PostForm);
