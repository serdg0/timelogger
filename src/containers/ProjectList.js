import React from 'react';
import Project from '../components/Project';

const ProjectList = props => {
    const { remove, projects, token, clock } = props;
    const display = projects.map(proj => <Project key={proj.id} clock={clock} token={token} proj={proj} remove={remove} />)

    return (
        <table>
            {display}
        </table>
    )
}

export default ProjectList;