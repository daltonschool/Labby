import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';
import Moment from 'react-moment';


import CalendarEvent from './CalendarEvent.jsx';

class CalendarDay extends Component {
    render() {
      console.log(this.props.others);

      that = this;
        return <div className="calendarColumn col-md-2">
            <h2>
                <Moment format="M/D/YY">
                  {this.props.date.toISOString()}
                </Moment>
            </h2>
            { this.props.events.map(function(event) {
                return <CalendarEvent event={event} />; //create a key

            })}

            {/*TODO: make this a compoent or a type of calendarevent*/}
          {this.props.others.map(o=>{
              return o.label + ": " + o.periods.map(p=>{ return p.start });
          })}
        </div>;
    }
}

// var otherScheds = this.state.others.map((o)=>{
//   return Periods.findOne({owner: o._id}).periods;
// })

// CalendarDay.propTypes = {
//   events: PropTypes.array.isRequired,
// };
//
export default createContainer(({periods, others, date}) => {
  Meteor.subscribe("periods");


  return {
    events: periods, //TODO: events should also include labs
    others: others.map(o => {
      o.periods = Periods.findOne({owner: o._id}).periods.filter(
        function(event) {
        return sameDay(event.start, date);
      }, this).map(o=>{return _.omit(o, 'name')})
      return o; //TOOD: include labs as well
    })

  }
}, CalendarDay);

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getDate() === d2.getDate()
    && d1.getMonth() === d2.getMonth();
}