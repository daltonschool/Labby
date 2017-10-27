import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Labs } from '../api/labs.js';

import CalendarGrid from './CalendarGrid.jsx';
import Nav from './Nav.jsx';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }



    render() {
        console.log(this.props.labs);
        return (
            <div>
                <Nav />
                <CalendarGrid events={this.props.labs} />
            </div>
        );
    }
}

App.propTypes = {
    labs: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

window.Labs = Labs;

export default createContainer(() => {
    Meteor.subscribe("schedules");
    Meteor.subscribe("labs");

    return {
        labs: Labs.find({ owner: Meteor.userId() }).fetch(),
        currentUser: Meteor.user(),
    };
}, App);
