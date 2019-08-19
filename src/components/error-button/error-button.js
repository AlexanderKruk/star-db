import React, { Component } from 'react';

import './error-button.css';

export default class ErrorButton extends Component {

  state = {
    hasError: false
  }

  render() {

    if(this.state.hasError) {
      this.foo.bar = 0;
    }

    return (
      <button className=" error-button btn btn-danger btn-lg"
              onClick={() => this.setState({ hasError: true })}>
        Throw Error
      </button>
    );
  }
}