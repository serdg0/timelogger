import React from 'react';
import ms from 'pretty-ms';
import PropTypes from 'prop-types';

const groupBy = require('lodash.groupby');
const mapValues = require('lodash.mapvalues');

const TimeList = props => {
  const { items } = props;
  const dateGroups = groupBy(items, 'date');
  const reducedObj = mapValues(dateGroups,
    o => o.map(el => el.time)
      .reduce((acc, val) => acc + val));
  const display = Object.entries(reducedObj).map(clock => (
    <div key={clock[0]} className="card">
      <div className="card-body">
        {clock[0]}
        :
        {ms(clock[1], { verbose: true })}
      </div>
    </div>
  ));
  const totalReducer = (acc, val) => acc + val.time;
  const total = items.reduce(totalReducer, 0);
  const text = display.length === 0 ? <small>No work log</small> : display;
  return (
    <div>
      <h4 className="header">Work log</h4>
      <div>
        {text}
      </div>
      <div>
        Total:
        {' '}
        {ms(total)}
      </div>
    </div>
  );
};

TimeList.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
};

export default TimeList;
