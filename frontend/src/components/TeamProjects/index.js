import './TeamProjects.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { CurrTeamContext } from '../../context/currTeam';
import { useParams, useHistory } from 'react-router-dom';
import ProjectModal from '../ProjectModal';
import OpenModalButton from '../OpenModalButton';
import { deleteProject } from '../../store/teams';

function TeamProjects() {
    const dispatch = useDispatch();
    const history = useHistory();
    const teams = useSelector(state => state.teams);
    const { currTeam, setCurrTeam } = useContext(CurrTeamContext);
    const { teamId } = useParams();

    useEffect(() => {
        if (currTeam != teamId) setCurrTeam(teamId);
    }, [teamId])

    return (
        <>
            <OpenModalButton
                buttonText="+ New Project"
                id='newProj'
                modalComponent={<ProjectModal currTeam={teams[currTeam]} edit={false} />}
            />
            {teams[currTeam]?.Projects && Object.values(teams[currTeam].Projects).map(proj => {
                if (proj.name !== 'Global') return (
                    <div className='projCard' onClick={()=>history.push(`/teams/${currTeam}/projects/${proj.id}`)}>
                        <p className='projName'>{proj.name}</p>
                        <p className={''+(proj.description?'':' empty')}>{proj.description ? proj.description : "Add a description with the 'Edit Project' button"}</p>
                        <p>Issues: {proj.Issues ? Object.keys(proj.Issues).length : '0'}</p>
                        <OpenModalButton
                            buttonText="Edit Project"
                            modalComponent={<ProjectModal currTeam={teams[currTeam]} edit={proj} />}
                        />
                        <button onClick={(e) =>{
                            e.stopPropagation();
                             dispatch(deleteProject(proj));
                             }}>Remove Project</button>
                    </div>
                )
            })}
        </>
    )
}

export default TeamProjects;
