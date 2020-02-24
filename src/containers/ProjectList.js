import React, { Component } from 'react';
import Project from '../components/Project';
import axios from 'axios';

class ProjectList extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidUpdate(prevProps) {
        const { token, projects } = this.props;
        if (projects !== prevProps.projects) {
            axios.get('http://localhost:3001/todos', { headers: {Authorization: token}})
            .then(response => {
              console.log(response);
              this.setState({
                  projects: response,
              })
            }).catch(error => console.log(error));
        }
    }

    render() {
        const { logged, projects } = this.props;
        const display = projects.map(proj => <Project obj={proj} />)
        return (
            <table>
                {logged && display}
            </table>
        )
    }
}

export default ProjectList;