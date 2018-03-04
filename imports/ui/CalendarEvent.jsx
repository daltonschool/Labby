import React, { Component } from 'react';

export default class CalendarEvent extends Component {
    render() {
        return <div>
            {this.props.event.name}
        </div>;
    }
}