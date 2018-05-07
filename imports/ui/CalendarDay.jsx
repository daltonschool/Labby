import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Moment from 'react-moment';
import { Labs } from '../api/labs.js';
import { Periods } from '../api/periods.js';
import { DateUtils } from "react-day-picker";

import CalendarEvent from './CalendarEvent.jsx';

class CalendarDay extends Component {
    render() {
        that = this;
        return <div className="flex-container">
            {/*flexbox line above*/}
            <div>
                <Moment format="M/D/YY">
                  {this.props.date.toISOString()}
                </Moment>
            </div>
            { this.props.periods && this.props.periods.map(function(event) {
                return <CalendarEvent event={event} />; //create a key
            })}

            {/*TODO: make this a compoent or a type of calendarevent*/}
          {this.props.others.map(o=>{
            return  o.label + ": " + o.periods.map(p=>{ return p.start });
          })}
        </div>;
    }
}


export default withTracker(({others, date}) => {
  Meteor.subscribe("periods");
  Meteor.subscribe("labs");

  let periodsDoc = Periods.findOne({owner: Meteor.userId()});
  let e = Labs.find({ owner: Meteor.userId() }).fetch()
    .concat(periodsDoc ? periodsDoc.periods : [])
    .filter((event) => { return DateUtils.isSameDay(event.start, date); }, this);

  return {
    events: e,
    others: others.map(o => {
      o.periods = Periods.findOne({owner: o._id}).periods.filter(
        function(event) {
        return DateUtils.isSameDay(event.start, date);
      }, this).map(o=>{return _.omit(o, 'name')});
      return o; //TOOD: include labs as well
    })

  }
})(CalendarDay);
