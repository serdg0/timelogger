import React from 'react';
import ms from 'pretty-ms';

const TimeList = props => {
    const { items } = props;
    const totalReducer = (acc, val) => acc + val.time;
    const total = items.reduce(totalReducer, 0);
    const display = items.map(clock => <li>
        On {clock.date} you worked {ms(clock.time, {verbose:true})}
        </li>)
    return (
        <div>
            <ul>
                {display}
                <li>Total: {ms(total)}</li>
            </ul>
        </div>
    )
};

export default TimeList;