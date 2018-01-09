import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import CalendarEvent from './CalendarEvent.jsx';

export default class CalendarColumn extends Component {
    render() {
        var that = this;
        return <div className="calendarColumn col-md-2">
            {this.props.events && this.props.events.filter(function(event) {
                return (event.startTime.getDay() === that.props.day);
            }).map(function(event) {
                return <CalendarEvent key={event._id._str} event={event} />;
            })}
        </div>;
    }
}