import React from 'react';
import axios from 'axios';
import Clock from './clock';

const Project = props => {
    const { remove, proj, proj: {id, title, created_at}, token, clock } = props;

    const handleDelete = () => {
        axios.delete(`http://localhost:3001/todos/${id}`, { data: {id: id}, headers: { Authorization: token} })
        .then(response => {
            remove(proj);
        }).catch(error => console.log(error))
    }
    
    return(
        <tr>
            <th>{title}</th>
            <th>{created_at}</th>
            <th><Clock clock={clock} id={id} /></th>
            <th><button onClick={() => handleDelete()} type="button">Remove</button></th>
        </tr>
    )
}

export default Project;