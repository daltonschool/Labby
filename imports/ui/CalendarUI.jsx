import React from 'react';
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import CalendarDay from './CalendarDay.jsx'
import Select from 'react-select';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../api/users';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';


import 'react-select/dist/react-select.css';
import 'react-day-picker/lib/style.css';

export class CalendarUI extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.changeDayBy = this.changeDayBy.bind(this);
    this.state = {
      date: new Date(),
      others: []
    }; //TODO optionally take as a param
  }

  render() {
    that=this;
    console.log(this.props.currentUser);
    return (
      <div>

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


CalendarUI.propTypes = {
  currentUser: PropTypes.object,
  users: PropTypes.array
};



export default CalendarUIContainer = withTracker(({props}) => {
  const usersHandle = Meteor.subscribe("users");
  const users = _.map(Users.find().fetch(), function(val, index) {
        val.label = val.profile.name;
        val.id = index;
        return val; });

  return {
    currentUser: Meteor.user(),
    users
  };
})(CalendarUI);