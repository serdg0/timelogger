import React from 'react';
import axios from 'axios';
import Clock from './Clock';
import TimeList from '../containers/TimeList';
import { format } from 'date-fns';

const Project = props => {
    const { remove, proj, proj: {id, title, created_at, items}, token, clock } = props;
    const creation = format(new Date(created_at), 'PPPP');

    const handleDelete = () => {
        axios.delete(`http://localhost:3001/todos/${id}`, { data: {id: id}, headers: { Authorization: token} })
        .then(response => {
            remove(proj);
        }).catch(error => console.log(error))
    }
    
    return(
        <div>
            <tr>
                <th>{title}</th>
                <th>{creation}</th>
                <th><Clock clock={clock} id={id} token={token} /></th>
                <th><button onClick={() => handleDelete()} type="button">Remove</button></th>
            </tr>
            <div>
                <TimeList items={items} />
            </div>
        </div>

    )
}

export default Project;