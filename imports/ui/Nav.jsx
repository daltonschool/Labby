import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Nav extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }



    render() {
        return (
            <header>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Labby</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}