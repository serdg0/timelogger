import React from 'react';

const Project = props => {
    const { proj: {title, created_at} } = props;

    return(
        <tr>
            <th>{title}</th>
            <th>{created_at}</th>
        </tr>
    )
}

export default Project;