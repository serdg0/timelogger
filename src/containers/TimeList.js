import React from 'react';
import ms from 'pretty-ms';
var groupBy = require('lodash.groupby');
var mapValues = require('lodash.mapvalues');


const TimeList = props => {
    const { items } = props;
    const dateGroups = groupBy(items, 'date');
    const reducedObj = mapValues(dateGroups, 
        function(o) { return o.map(el => el.time)
            .reduce((acc, val) => acc + val) });
    const display = Object.entries(reducedObj).map(clock =>
        <li key={clock[1]}>
            {clock[0]}: {ms(clock[1], { verbose: true })}
        </li>)
    const totalReducer = (acc, val) => acc + val.time;
    const total = items.reduce(totalReducer, 0);

    return (
        <div>
            <ul>
                {display}
            </ul>
            <div>
                Total: {ms(total)}
            </div>
        </div>
    )
};

export default TimeList;