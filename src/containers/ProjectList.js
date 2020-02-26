import React, { Component } from 'react';
import Project from '../components/Project';

class ProjectList extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { remove, projects, token, clock } = this.props;
        const display = projects.map(proj => <Project key={proj.id} clock={clock} token={token} proj={proj} remove={remove} />)
        return (
            <table>
                {display}
            </table>
        )
    }
}

export default ProjectList;