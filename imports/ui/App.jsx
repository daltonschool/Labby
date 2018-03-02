import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import CalendarDay from './CalendarDay.jsx'
import { CalendarTokens } from '../api/calendarTokens.js';
import { Users } from '../api/users.js';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


import DayPickerInput from 'react-day-picker/DayPickerInput';
import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import Nav from './Nav.jsx';
import WebcalLinkUI from './WebcalLinkUI.jsx';


// App component - represents the whole app
class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.changeDayBy = this.changeDayBy.bind(this);
        this.state = {
          date: new Date(),
          others: []
        }; //TODO optionally take as a param

    }

    render() {

        return (
            <div>
                <Nav />
                {!this.props.token && <WebcalLinkUI />}

                <div className="container-fluid">

                  {/*TODO: date selection should be a component*/}
                  <button className="btn btn-default btn-xs" onClick={event => {
                    let d = this.state.date;
                    this.setState({date: moment(d).subtract(1, 'days').toDate()})
                  }}>
                    <span className="glyphicon glyphicon-chevron-left"/>
                  </button>
                  <DayPickerInput
                    formatDate={formatDate}
                    value={this.state.date}
                    parseDate={parseDate}
                    placeholder={`${formatDate(this.state.date)}`}
                    onDayChange={this.handleDayChange}
                    dayPickerProps={{
                      todayButton: "Go to Today",
                      disabledDays: { daysOfWeek: [0, 6] }
                    }}
                  />
                  <button className="btn btn-default btn-xs" onClick={event => {
                    let d = this.state.date;
                    this.setState({date: moment(d).add(1, 'days').toDate()})
                  }}>
                    <span className="glyphicon glyphicon-chevron-right"/>
                  </button>
                  <br/>
                  <br/>

                  {/*TODO: person selection should be a component*/}
                  <Select
                    style={{width: '100%'}}
                    value={this.state.others}
                    valueKey="_id"
                    name="other-people"
                    multi={true}
                    options={this.props.users}
                    onChange={(e)=>{
                      this.setState({others: e});
                    }}
                  />
                  <br/>


                  <CalendarDay
                        date={ this.state.date }
                        others={ this.state.others }
                    />
                </div>
            </div>
        );
    }

  handleDayChange(day) {
    this.setState({ date: day });
  }

  changeDayBy(incr) {
    let d = this.state.date;
    d.setDate(d.getDate() + incr);
    this.handleDayChange(d);
  }
}


App.propTypes = {
    currentUser: PropTypes.object,
};


export default createContainer(() => {
    Meteor.subscribe("calendarTokens");
    Meteor.subscribe("schedules");
    Meteor.subscribe("allUsers");

    return {
      token: CalendarTokens.findOne({ owner: Meteor.userId() }),
      currentUser: Meteor.user(),
      users: _.map(Users.find().fetch(), function(val, index) {
        val.label = val.profile?val.profile.name:val.username;
        val.id = index;
        return val; }),
    };
}, App);
