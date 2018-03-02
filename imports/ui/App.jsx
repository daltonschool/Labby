import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import CalendarDay from './CalendarDay.jsx'
import { CalendarTokens } from '../api/calendarTokens.js';
import { Labs } from '../api/labs.js';
import { Periods } from '../api/periods.js';
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
                  <button className="btn btn-default btn-xs" onClick={this.changeDayBy.bind(this, -1)}>
                    <span className="glyphicon glyphicon-chevron-left"/>
                  </button>
                  <DayPickerInput
                    formatDate={formatDate}
                    parseDate={parseDate}
                    disabledDays={{ daysOfWeek: [0, 6] }}
                    selectedDays={this.state.date}
                    placeholder={`${formatDate(this.state.date)}`}
                    onDayChange={this.handleDayChange}
                    todayButton="Go to Today"
                  />
                  <button className="btn btn-default btn-xs" onClick={this.changeDayBy.bind(this, 1)}>
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
                        periods={ this.props.periods.filter(function(event) {
                            return sameDay(event.start, this.state.date);
                        }, this)
                        }
                        labs={ this.props.labs.filter(function(event) {
                           return sameDay(event.start, this.state.date);
                        }, this)
                        }
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
    this.setState({date: d});
  }
}

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getDate() === d2.getDate()
    && d1.getMonth() === d2.getMonth();
}

App.propTypes = {
    labs: PropTypes.array.isRequired,
    periods: PropTypes.array,
    currentUser: PropTypes.object,
};

window.CalendarTokens = CalendarTokens;
window.Labs = Labs;
window.Periods = Periods;
window.Users = Users;

export default createContainer(() => {
    Meteor.subscribe("calendarTokens");
    Meteor.subscribe("labs");
    Meteor.subscribe("periods");
    Meteor.subscribe("schedules");
    Meteor.subscribe("allUsers");

    var periodsDoc = Periods.findOne({owner: Meteor.userId()});

    return {
      token: CalendarTokens.findOne({ owner: Meteor.userId() }),
      labs: Labs.find({ owner: Meteor.userId() }).fetch(),
      periods: (periodsDoc ? periodsDoc.periods : []),
      currentUser: Meteor.user(),
      users: _.map(Users.find().fetch(), function(val, index) {
        val.label = val.profile?val.profile.name:val.username;
        val.id = index;
        return val; }),
    };
}, App);
