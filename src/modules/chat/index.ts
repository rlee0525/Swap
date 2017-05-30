import React from 'react';
import { connect } from 'react-redux';
import Chat from './component';

const mapStateToProps = (state, ownProps) => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);