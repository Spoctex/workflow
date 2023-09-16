import './ProjectIssues.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { CurrTeamContext } from '../../context/currTeam';
import { useParams } from 'react-router-dom';
import IssueBoard from '../IssueBoard';

function ProjectIssues() {
    const teams = useSelector(state => state.teams);
    const { currTeam, setCurrTeam } = useContext(CurrTeamContext);
    const [projIssues, setProjIssues] = useState([]);
    const { teamId, projectId } = useParams();

    useEffect(() => {
        if (currTeam != teamId) setCurrTeam(teamId);
    }, [teamId])

    useEffect(() => {
        let currProj = teams[currTeam]?.Projects[projectId];
        if (currProj) {
            setProjIssues(Object.values(currProj.Issues).map(iss=>[iss,currProj,teams[currTeam]]));
        }
    }, [currTeam, teams, projectId])
    return (
        <IssueBoard issArr={projIssues}/>
    )
}

export default ProjectIssues;



