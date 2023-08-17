import './TeamProjects.css'
import { useEffect, useState } from 'react';
import IssueCard from '../IssueCard';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { CurrTeamContext } from '../../context/currTeam';
import { useParams } from 'react-router-dom';

function TeamProjects() {
    const user = useSelector(state => state.session.user);
    const teams = useSelector(state => state.teams);
    const { currTeam,setCurrTeam } = useContext(CurrTeamContext);
    const {teamId} = useParams();

    useEffect(() => {
        if (currTeam != teamId)setCurrTeam(teamId);
    }, [teamId])

    return (
        <>
            {teams[currTeam]?.Projects && Object.values(teams[currTeam].Projects).map(proj=>(
            <div>
                <p>
                {proj.name}
                </p>
                <p>{proj.description}</p>
                <p>Issues :{Object.keys(proj.Issues).length}</p>
                
            </div>
            ))}
        </>
    )
}

export default TeamProjects;
