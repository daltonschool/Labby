import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const CalendarTokens = new Mongo.Collection('calendarTokens');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish periods that are public or belong to the current user
    Meteor.publish('calendarTokens', function calendarTokensPublication() {
        return CalendarTokens.find({
            owner: this.userId
        });
    });
}

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
