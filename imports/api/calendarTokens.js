import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const CalendarTokens = new Mongo.Collection('calendarTokens');

Meteor.methods({
    'calendarTokens.set'(token) {
        check(token, String);

        CalendarTokens.update({
            owner: this.userId
        }, {
            token: token,
            owner: this.userId
        }, {
            upsert: true
        });
    }
});
