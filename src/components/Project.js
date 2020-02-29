import React from 'react';
import axios from 'axios';
import Clock from './Clock';
import TimeList from '../containers/TimeList';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Project = props => {
    const { match, remove, token, clock, projects } = props;
    const project = projects.find(({id}) => id.toString() === match.params.projectId);
    const { id, title, created_at, items } = project;
    const creation = format(new Date(created_at), 'PPPP');

    const handleDelete = () => {
        axios.delete(`http://localhost:3001/todos/${id}`, { data: {id: id}, headers: { Authorization: token} })
        .then(response => {
            remove(project);
        }).catch(error => console.log(error))
    }
    
    return(
        <div>
            <tr>
                <th>{title}</th>
                <th>{creation}</th>
                <th><Clock clock={clock} id={id} token={token} /></th>
                <th><button className='btn btn-danger' onClick={() => handleDelete()} type="button"><Link to='/projects'>Remove</Link></button></th>
            </tr>
            <div>
                <TimeList items={items} />
            </div>
            <Link to='/projects'>Back</Link>
        </div>

    )
}

export default Project;