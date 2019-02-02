import React from 'react';
import PropTypes from 'prop-types';

import { formatCurency, getRotateDeg } from './utils';

function Meter(props) {
  const isLoading = !props.data;
  const { value = 0, max = 1, min = 0, format, unit, error } = props.data || {};
  const hideValues = isLoading || error;
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
        style={{ visibility: hideValues ? "hidden" : "visible" }}
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
          style={{ visibility: hideValues ? "hidden" : "visible" }}
        >
          {min}
        </div>
        <div
          className="Meter__max"
          style={{ visibility: hideValues ? "hidden" : "visible" }}
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
    value: PropTypes.number
  })
};

export default Meter;
