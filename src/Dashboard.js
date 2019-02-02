import React, { Component } from 'react';

import Widget from './Widget';
import Meter from './Meter';

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

        // delay to show loading state
        setTimeout(() => {
          this.setState({ meter: res });
        }, 500);
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
        <Widget>
          <Meter data={this.state.meter} />
        </Widget>
      </div>
    );
  }
}

export default Dashboard;
