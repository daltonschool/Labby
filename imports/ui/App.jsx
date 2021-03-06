import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Authenticated from './components/Authenticated';
import Public from './components/Public';
import WebcalLinkUI from "./WebcalLinkUI";
import CalendarUI from "./CalendarUI";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Navigation from "./Nav";
import { CalendarTokens } from '../api/calendarTokens.js';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import Nav from './Nav.jsx';
import Select2 from 'react-select2-wrapper';
import styles from './CalCSS.css';


// App component - represents the whole app
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { afterLoginPath: null };
  }

  setAfterLoginPath = function(afterLoginPath) {
    this.setState({ afterLoginPath });
  }.bind(this);

  render() {
    const { props, state, setAfterLoginPath } = this;
    return (
      <Router>
      <div className="App">
      <Navigation {...props} {...state} />
      {!this.props.token && this.props.authenticated ?
      <WebcalLinkUI/>
      : ''}
    <Switch>
      <Authenticated exact name="index" path="/" component={CalendarUI} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
      {/*make Login the react login */}
      <Public path="/login" component={Login} {...props} {...state} />
      <Route path="/logout" render={routeProps => <Logout {...routeProps} setAfterLoginPath={setAfterLoginPath} />} {...props} {...state} />
      <Route component={NotFound} />
    </Switch>
    </div>
  </Router>
    );
  }
}

App.defaultProps = {
  userId: '',
};

App.propTypes = {
  userId: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const name = user && user.profile && user.profile.name;
  Meteor.subscribe("calendarTokens");


  return {
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name,
    userId,
    token: CalendarTokens.findOne({ owner: Meteor.userId() }),
  };
})(App);


