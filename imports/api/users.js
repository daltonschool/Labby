import { Meteor } from 'meteor/meteor';

export const Users = Meteor.users;

if (Meteor.isServer) {
  Meteor.publish('allUsers', function() {
    return Meteor.users.find({}, {fields:{'profile.name':1}})
  })
}

