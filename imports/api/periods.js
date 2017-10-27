import { Meteor } from 'meteor/meteor';

import { HTTP } from 'meteor/http';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { CalendarTokens } from "./calendarTokens.js";

export const Periods = new Mongo.Collection('periods');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish periods that are public or belong to the current user
    Meteor.publish('periods', function periodsPublication() {
        return Periods.find({
            owner: this.userId
        });
    });
}

var parseiCal = function(str) {
    var eventStrings = str.split("BEGIN:VEVENT");
    var periods = [];

    eventStrings.forEach(function(eventString) {
        var eventLines = eventString.split("\r\n");
        var start = eventLines[2].split(":")[1];
        var end = eventLines[3].split(":")[1];
        var summary = eventLines[5].substr(eventLines[5].indexOf(":") + 1);
        var allDay = (start.indexOf("T") === -1);
        if (!allDay) {
            periods.push({
                name: summary,
                start: moment(start, "YYYYMMDDTHHmmss").toDate(),
                end: moment(end, "YYYYMMDDTHHmmss").toDate()
            });
        }
    });

    return periods;
};

Meteor.methods({
    'periods.update'(userId) {
        check(userId, String);
        this.unblock();

        var token = CalendarTokens.findOne({
            owner: userId
        });

        var url = "https://dalton.myschoolapp.com" + token.token;

        try {
            const ical = HTTP.call("GET", url, {});
            Periods.remove({
                owner: userId
            });
            var periods = parseiCal(ical.content);
            Periods.insert({
                periods: periods,
                owner: userId
            });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
});
