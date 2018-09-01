import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './loader-component.css';

const LoadingComponent = (props) => {
  if (props.isLoaderOn) {
    return (
      <div className="flickity-container">
        <div className="loading-hand">
          <div className="loading-card loading-card-1"><span /></div>
          <div className="loading-card loading-card-2"><span /></div>
          <div className="loading-card loading-card-3"><span /></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    ); 
  }
  return '';
};

const mapStateToProps = state => ({
  isLoaderOn: state.isLoaderOn
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingComponent);