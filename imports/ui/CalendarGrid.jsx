import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import CalendarColumn from './CalendarColumn.jsx';

export default class CalendarGrid extends Component {
    render() {
       return <div className="row">
           <CalendarColumn labs={this.props.labs} periods={this.props.periods} day={1} />
           <CalendarColumn labs={this.props.labs} periods={this.props.periods} day={2} />
           <CalendarColumn labs={this.props.labs} periods={this.props.periods} day={3} />
           <CalendarColumn labs={this.props.labs} periods={this.props.periods} day={4} />
           <CalendarColumn labs={this.props.labs} periods={this.props.periods} day={5} />
       </div>;
    }
}