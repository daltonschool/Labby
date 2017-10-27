import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Labs } from '../api/labs.js';
import { Periods } from '../api/periods.js';

import CalendarGrid from './CalendarGrid.jsx';
import Nav from './Nav.jsx';

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
                <CalendarGrid events={this.props.labs} periods={this.props.periods} />
            </div>
        );
    }
}

App.propTypes = {
    labs: PropTypes.array.isRequired,
    periods: PropTypes.array,
    currentUser: PropTypes.object,
};

window.Labs = Labs;
window.Periods = Periods;

export default createContainer(() => {
    Meteor.subscribe("labs");
    Meteor.subscribe("periods");
    Meteor.subscribe("schedules");

    var periodsDoc = Periods.findOne({});

    return {
        labs: Labs.find({ owner: Meteor.userId() }).fetch(),
        periods: (periodsDoc ? periodsDoc.periods : undefined),
        currentUser: Meteor.user(),
    };
}, App);
