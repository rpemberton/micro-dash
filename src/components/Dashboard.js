import React, { Component } from 'react';

import Widget from './Widget';
import Meter from './Meter';

import { isValidMeterData } from '../utils';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meterData: {
        isLoading: true,
        error: false
      }
    };

    this.fallbackData = {
      value: 34,
      min: 0,
      max: 200,
      format: 'currency',
      unit: 'GBP'
    };
  }

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
        console.error(err);

        const meterData = this.state.meterData;

        // Don't show error on first request
        // Reduce frequency of server/data errors
        if (this.state.meterData.value === undefined || Math.random() < 0.95) {
          const newMeterData = Object.assign({}, meterData, this.fallbackData);
          newMeterData.isLoading = false;

          this.setState({
            meterData: newMeterData
          });

          return;
        }

        this.setState({
          meterData: { error: true, isLoading: false }
        });
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
