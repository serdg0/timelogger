import React from 'react';
import ProjectForm from './ProjectForm';
import Project from '../components/Project';
import Total from './TotalsTracker';
import { Switch, Route, Link } from 'react-router-dom';

const ProjectList = props => {
    const { add, projects, token, match, reset } = props;
    const display = projects.map(proj =>
        <div key={proj.id} className='card'>
            <Link to={`${match.url}/${proj.id}`}>
                <div className='card-body header'>
                    {proj.title}
                </div>
            </Link>
        </div> 
    )
    const logout= () => reset();
    return (
        <div className='center'>
            
            <Link to='signin'><button className='btn btn-link blue' onClick={() => logout()}>Log Out</button></Link>
            <h3 className='header'>Projects</h3>
            <small><Total projects={projects} /></small>
            <Link to='newproject'>New Project</Link>
            <div>
                {display}
            </div>
        </div>
    )
}

const ProjectsSwitch = props => {
    const { clock, token, projects, add, remove, reset } = props;
    return (
        <Switch>
            <Route exact path='/projects' render={(routerProps) => <ProjectList reset={reset} clock={clock} token={token} projects={projects} add={add} remove={remove} {...routerProps} />} />
            <Route path='/projects/:projectId' render={(routerProps) => <Project projects={projects} clock={clock} token={token} remove={remove} {...routerProps}/>} />
        </Switch>
    )
}

export {ProjectList, ProjectsSwitch};