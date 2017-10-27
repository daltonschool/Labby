import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class CalendarEvent extends Component {
    render() {
        return <div>
            {this.props.event.name}
        </div>;
    }
}