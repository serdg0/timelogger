import React from 'react';
import ms from 'pretty-ms';

const TimeList = props => {
    const { items } = props;
    const display = items.map(clock => <li>
        On {clock.date} you worked {ms(clock.time, {verbose:true})}
        </li>)
    return(
        <div>
            <ul>
                {display}
            </ul>
        </div>
    )
};

export default TimeList;