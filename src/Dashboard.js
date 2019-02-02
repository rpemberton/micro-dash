import React, { Component } from 'react';

import { isValidMeterData } from './utils';

class Dashboard extends Component {
  state = {
    meter: null
  };

  componentDidMount() {
    this.getMeterData()
      .then(res => {
        if (!isValidMeterData(res)) {
          throw new Error('Bad data');
        }

        this.setState({ meter: res });
      })
      .catch(err => {
        console.error(err);
        this.setState({ meter: { error: true } });
      });
  }

  getMeterData() {
    return fetch('https://widgister.herokuapp.com/challenge/frontend')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      });
  }

  render() {
    return (
      <div className="Dashboard">
        Dashboard
      </div>
    );
  }
}

export default Dashboard;
