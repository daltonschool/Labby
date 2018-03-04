import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

class Logout extends React.Component {
  componentDidMount() {
    Meteor.logout(() => this.props.setAfterLoginPath(null));
  }

  render() {
    return (
      <div className="Logout">
        <h1>Thanks for using Labby.</h1>
      </div>
    );
  }
}

Logout.propTypes = {
  setAfterLoginPath: PropTypes.func.isRequired,
};

export default Logout;