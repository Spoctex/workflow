import './TeamProjects.css'
import { useEffect, useState } from 'react';
import IssueCard from '../IssueCard';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { CurrTeamContext } from '../../context/currTeam';
import { useParams } from 'react-router-dom';
import ProjectModal from '../ProjectModal';
import OpenModalButton from '../OpenModalButton';
import { deleteProject } from '../../store/teams';

function TeamProjects() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const teams = useSelector(state => state.teams);
    const { currTeam, setCurrTeam } = useContext(CurrTeamContext);
    const { teamId } = useParams();

    useEffect(() => {
        if (currTeam != teamId) setCurrTeam(teamId);
    }, [teamId])

    return (
        <>
            {currTeam && <OpenModalButton
                buttonText="New Project"
                modalComponent={<ProjectModal currTeam={teams[currTeam]} edit={false} />}
            />}
            {teams[currTeam]?.Projects && Object.values(teams[currTeam].Projects).map(proj => {
                if (proj.name !== 'Global') return (
                    <div>
                        <p>
                            {proj.name}
                        </p>
                        <p>Description: {proj.description ? proj.description : 'Unset'}</p>
                        <p>Issues :{proj.Issues?Object.keys(proj.Issues).length:'0'}</p>
                        <OpenModalButton
                            buttonText="Edit Project"
                            modalComponent={<ProjectModal currTeam={teams[currTeam]} edit={proj} />}
                        />
                        <button onClick={()=>dispatch(deleteProject(proj))}>Remove Project</button>
                    </div>
                )
            })}
        </>
    )
}

export default TeamProjects;
