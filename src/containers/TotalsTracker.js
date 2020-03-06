import React from 'react';
import ms from 'pretty-ms';
import PropTypes from 'prop-types';

const Totals = props => {
  const { projects } = props;

  const timeReducer = (acc, val) => acc + val.time;
  const projectReducer = (acc, val) => acc + val.items.reduce(timeReducer, 0);
  const totalReducer = projects.reduce(projectReducer, 0);
  return (
    <div>
      Total time:
      {' '}
      {ms(totalReducer)}
    </div>
  );
};

Totals.propTypes = {
  projects: PropTypes.instanceOf(Array).isRequired,
};

export default Totals;
