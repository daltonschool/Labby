import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import CalendarEvent from './CalendarEvent.jsx';

export default class CalendarGrid extends Component {
    render() {
       return <div>
           <div className="calendarGridColumn">{this.props.events.filter(function(event) {
               return (event.startTime.getDay() === 1);
           }).map(function(event) {
               return <CalendarEvent key={event._id._str} event={event} />;
           })}</div>
           <div className="calendarGridColumn">{this.props.events.filter(function(event) {
               return (event.startTime.getDay() === 2);
           }).map(function(event) {
               return <CalendarEvent key={event._id._str} event={event} />;
           })}</div>
           <div className="calendarGridColumn">{this.props.events.filter(function(event) {
               return (event.startTime.getDay() === 3);
           }).map(function(event) {
               return <CalendarEvent key={event._id._str} event={event} />;
           })}</div>
           <div className="calendarGridColumn">{this.props.events.filter(function(event) {
               return (event.startTime.getDay() === 4);
           }).map(function(event) {
               return <CalendarEvent key={event._id._str} event={event} />;
           })}</div>
           <div className="calendarGridColumn">{this.props.events.filter(function(event) {
               return (event.startTime.getDay() === 5);
           }).map(function(event) {
               return <CalendarEvent key={event._id._str} event={event} />;
           })}</div>
       </div>;
    }
}