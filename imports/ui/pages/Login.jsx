import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import OAuthLoginButtons from '../components/OAuthLoginButtons';


export default class AccountsUIWrapper extends Component {
  render() {
    return <OAuthLoginButtons
      services={['google']}
      emailMessage={{
        offset: 100,
        text: 'Log In with an Email Address',
      }}
    />
  }



}
