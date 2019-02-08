import React, { Component } from 'react';

import Widget from './Widget';
import Meter from './Meter';

import { isValidMeterData } from '../utils';

class Dashboard extends Component {
  state = {
    meterData: {
      isLoading: true,
      error: false,
    }
  };

  componentDidMount() {
    this.init();
  }

  init() {
    this.getMeterData()
      .then(res => {
        if (!isValidMeterData(res)) {
          throw new Error('Bad data');
        }

        const newMeterData = Object.assign({}, this.state.meterData, res);
        newMeterData.isLoading = false;

        // delay to show loading state
        setTimeout(() => {
          this.setState({ meterData: newMeterData });
        }, 500);
      })
      .catch(err => {
        this.setState({
          meterData: { error: true, isLoading: false } ,
        });

        console.error(err);
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

  getNewMeterData = () => {
    const meterData = Object.assign({}, this.state.meterData);
    meterData.isLoading = true;
    meterData.error = false;

    this.setState({ meterData });

    this.init();
  }

  render() {
    return (
      <div className="Dashboard">
        <Widget>
          <Meter data={this.state.meterData} getNewData={this.getNewMeterData} />
        </Widget>
      </div>
    );
  }
}

export default Dashboard;
