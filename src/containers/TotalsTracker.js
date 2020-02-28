import React from 'react';
import ms from 'pretty-ms';

const Totals = props => {
    const { projects } = props;

    const timeReducer = (acc, val) => acc + val.time;
    const projectReducer = (acc, val) => acc + val.items.reduce(timeReducer, 0);
    const totalReducer = projects.reduce(projectReducer, 0);
    return (
        <div>
            Total time: {ms(totalReducer)}
        </div>
    )
}

export default Totals;