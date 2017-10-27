import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Labs = new Mongo.Collection('labs');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish labs that are public or belong to the current user
    Meteor.publish('labs', function labsPublication() {
        return Labs.find({

        });
    });
}

Meteor.methods({
    'labs.insert'(lab) {
        check(lab.name, String);
        check(lab.participants, Array);
        check(lab.startTime, Date);
        check(lab.endTime, Date);

        // Make sure the user is logged in before inserting a lab
        // if (! this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }

        Labs.insert({
            name: lab.name,
            createdAt: new Date(),
            owner: this.userId,
            participants: lab.participants,
            startTime: lab.startTime,
            endTime: lab.endTime,
        });
    },
    'labs.remove'(labId) {
        check(labId, String);

        const lab = Labs.findOne(labId);
        if (lab.private && lab.owner !== this.userId) {
            // If the lab is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Labs.remove(labId);
    },
    'labs.setChecked'(labId, setChecked) {
        check(labId, String);
        check(setChecked, Boolean);

        const lab = Labs.findOne(labId);
        if (lab.private && lab.owner !== this.userId) {
            // If the lab is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }

        Labs.update(labId, { $set: { checked: setChecked } });
    },
    'labs.setPrivate'(labId, setToPrivate) {
        check(labId, String);
        check(setToPrivate, Boolean);

        const lab = Labs.findOne(labId);

        // Make sure only the lab owner can make a lab private
        if (lab.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Labs.update(labId, { $set: { private: setToPrivate } });
    },
});
