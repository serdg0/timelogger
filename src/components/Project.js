import React from 'react';
import axios from 'axios';

const Project = props => {
    const { remove, proj, proj: {id, title, created_at}, token } = props;
    const handleDelete = () => {
        axios.delete(`http://localhost:3001/todos/${id}`, {  data: {id: id}, headers: { Authorization: token} })
        .then(response => {
            remove(proj);
        }).catch(error => console.log(error))
    }
    return(
        <tr>
            <th>{title}</th>
            <th>{created_at}</th>
            <button onClick={() => handleDelete()} type="button">Remove</button>
        </tr>
    )
}

export default Project;