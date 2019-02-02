import React from 'react';
import PropTypes from 'prop-types';

import { formatCurency, getRotateDeg } from '../utils';

function Meter(props) {
  const {
    value = 0,
    max = 1,
    min = 0,
    format,
    unit,
    error,
    isLoading
  } = props.data || {};

  const hasData = typeof props.data.value === 'number';
  const rotateDeg = getRotateDeg(min, max, value);
  let meterText = isLoading ? 'Loading...' : 'css-o-meter';

  if (error) {
    meterText = 'Error. Try refreshing.';
  }

  let meterValue = value;

  if (format === 'currency' && unit) {
    meterValue = formatCurency(unit, value);
  }

  return (
    <div className="Meter">
      <div
        className="Meter__val"
        style={{ visibility: hasData ? "visible" : "hidden" }}
      >
        {meterValue}
      </div>

      <div className="Meter__dial">
        <div className="Meter__arc-clip">
          <div
            className="Meter__arc"
            style={{ transform: `rotate(-45deg) rotate(${rotateDeg}deg)` }}
          />
        </div>

        <div
          className="Meter__needle"
          style={{ transform: `rotate(-90deg) rotate(${rotateDeg}deg)` }}
        />
        <div className="Meter__needle-base" />

        <div
          className="Meter__min"
          style={{ visibility: hasData ? "visible" : "hidden" }}
        >
          {min}
        </div>
        <div
          className="Meter__max"
          style={{ visibility: hasData ? "visible" : "hidden" }}
        >
          {max}
        </div>
      </div>

      <p className="Meter__info">{meterText}</p>
    </div>
  );
}

Meter.propTypes = {
  data: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    isLoading: PropTypes.bool,
    error: PropTypes.bool
  })
};

export default Meter;
