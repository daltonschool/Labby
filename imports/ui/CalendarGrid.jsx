import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import CalendarColumn from './CalendarColumn.jsx';

export default class CalendarGrid extends Component {
    render() {
       return <div>
           <CalendarColumn events={this.props.events} day={1} />
           <CalendarColumn events={this.props.events} day={2} />
           <CalendarColumn events={this.props.events} day={3} />
           <CalendarColumn events={this.props.events} day={4} />
           <CalendarColumn events={this.props.events} day={5} />
       </div>;
    }
}