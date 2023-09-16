import 'ProjectIssues.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { CurrTeamContext } from '../../context/currTeam';
import { useParams } from 'react-router-dom';
import IssueBoard from '../IssueBoard';

function ProjectIssues() {
    const teams = useSelector(state => state.teams);
    const { currTeam, setCurrTeam } = useContext(CurrTeamContext);
    const [teamIssues, setTeamIssues] = useState([]);
    const { teamId, projId } = useParams();

    useEffect(() => {
        if (currTeam != teamId) setCurrTeam(teamId);
    }, [teamId])

    useEffect(() => {
        if (teams[currTeam].Projects[projId]) {
            setTeamIssues(Object.values(teams[currTeam].Projects[projId].Issues));
        }
    }, [currTeam, teams, ])

    return (
        <IssueBoard issArr={teamIssues}/>
    )
}

export default ProjectIssues;



