import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import linkState from 'linkstate';

export default class WebcalLinkUI extends Component {
    constructor() {
        super();
        this.state = {};
    }

    submit() {
        if (!this.state.link) {
            alert("You must enter a link");
            return;
        }
        var link = this.state.link || "";
        if (!link.startsWith("https://")) {
            alert("Invalid link, you must use the Feed URL");
            return;
        }
        Meteor.call("calendarTokens.set", link.replace("https://dalton.myschoolapp.com", ""), () => {
            Meteor.call("periods.update", Meteor.userId(), () => {

            });
        });
    }

    render() {
        return <div>
            <p>Put in your webcal link: (go to <a href="https://dalton.myschoolapp.com/app/student#myschedule">this page</a>, click the green RSS button, and copy and paste the <strong>Feed URL</strong>.)</p>
            <input type="text" value={this.state.link} onChange={linkState(this, "link")} />
            <button className="btn" onClick={this.submit.bind(this)}>Submit</button>
        </div>;
    }
}