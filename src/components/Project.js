import React from 'react';

const Project = props => {
    const { project: {date, time, name} } = props;

    return(
        <tr>
            <th>{date}</th>
            <th>{time}</th>
            <th>{name}</th>
        </tr>
    )
}

export default Project;