import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';
import Moment from 'react-moment';


import CalendarEvent from './CalendarEvent.jsx';

export default class CalendarDay extends Component {
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
        </div>;
    }
}

// CalendarDay.propTypes = {
//   events: PropTypes.array.isRequired,
// };
//
// export default createContainer(() => {
//   return {
//     events: this.props.periods,
//   };
// }, CalendarDay);