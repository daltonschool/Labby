import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { withTracker } from 'meteor/react-meteor-data';



class CalendarEvent extends Component {
    render() {
        const divStyle = {
            top: this.props.theTop,
            height: this.props.theHeight
        };

        // console.log(this.props.event);

        return <div style={divStyle}>
            {this.props.event.name}
        </div>;
    }
}



export default CalendarEventContainer = withTracker(({event})=> {

    const dayBeginsMinutes = 450 //specific to a 7:30 start
    const hours = moment(event.start).hours();
    const minutes = moment(event.start).minutes();

    const totalMinutesStart = hours*60+minutes;
    let top = totalMinutesStart - dayBeginsMinutes;
    //top /=2;

    const hoursend = moment(event.end).hours();
    const minutesend = moment(event.end).minutes();
    const totalMinutesEnd = hoursend*60+minutesend;
    let height = totalMinutesEnd-totalMinutesStart;
    //height /=2;

    const pixratio = 2; //pixels per minute


    return {
        event: event,
        theTop: pixratio*top + 100 + "px",
        theHeight: pixratio*height + "px"
    }
})(CalendarEvent)