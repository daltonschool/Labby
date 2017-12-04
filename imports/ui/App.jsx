import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { CalendarTokens } from '../api/calendarTokens.js';
import { Labs } from '../api/labs.js';
import { Periods } from '../api/periods.js';

import CalendarGrid from './CalendarGrid.jsx';
import Nav from './Nav.jsx';
import WebcalLinkUI from './WebcalLinkUI.jsx';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <Nav />
                {!this.props.token && <WebcalLinkUI />}
                <CalendarGrid labs={this.props.labs} periods={this.props.periods} />
            </div>
        );
    }
}

App.propTypes = {
    labs: PropTypes.array.isRequired,
    periods: PropTypes.array,
    currentUser: PropTypes.object,
};

window.CalendarTokens = CalendarTokens;
window.Labs = Labs;
window.Periods = Periods;

export default createContainer(() => {
    Meteor.subscribe("calendarTokens");
    Meteor.subscribe("labs");
    Meteor.subscribe("periods");
    Meteor.subscribe("schedules");

    var periodsDoc = Periods.findOne({});

    return {
        token: CalendarTokens.findOne({ owner: Meteor.userId() }),
        labs: Labs.find({ owner: Meteor.userId() }).fetch(),
        periods: (periodsDoc ? periodsDoc.periods : undefined),
        currentUser: Meteor.user(),
    };
}, App);
