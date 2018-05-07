import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
// import CalUI from '../imports/ui/CalUI'

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
