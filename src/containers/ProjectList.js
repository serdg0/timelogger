import React, { Component } from 'react';
import Project from '../components/Project';
import axios from 'axios';

class ProjectList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        if (this.props.logged) {
            axios.get('http://localhost:3001/todos')
            .then(response => {
                console.log(response)
            })
        }

    }

    render() {
        const { logged } = this.props;
        return (
            <table>
                {logged}
            </table>
        )
    }
}

export default ProjectList;