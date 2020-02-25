import React, { Component } from 'react';
import Project from '../components/Project';
import axios from 'axios';
import { addProjectAction } from '../actions';

class ProjectList extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { logged, projects } = this.props;
        const display = projects.map(proj => <Project key={proj.id} proj={proj} />)
        return (
            <table>
                {display}
            </table>
        )
    }
}

export default ProjectList;