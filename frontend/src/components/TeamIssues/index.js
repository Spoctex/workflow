import './TeamIssues.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { CurrTeamContext } from '../../context/currTeam';
import { useParams } from 'react-router-dom';
import IssueBoard from '../IssueBoard';

function TeamIssues() {
    const user = useSelector(state => state.session.user);
    const teams = useSelector(state => state.teams);
    const { currTeam, setCurrTeam } = useContext(CurrTeamContext);
    const [userIssues, setUserIssues] = useState([]);
    // const [filter, setFilter] = useState('all');
    const { teamId } = useParams();

    useEffect(() => {
        if (currTeam != teamId) setCurrTeam(teamId);
    }, [teamId])

    useEffect(() => {
        if (teams[currTeam]) {
            let issues = [];
            Object.values(teams[currTeam].Projects).forEach(proj => {
                Object.values(proj.Issues).forEach(iss => {
                     issues.push([iss, proj, teams[currTeam]])
                })
            });
            setUserIssues(issues)
        }
    }, [currTeam, teams])

    return (
        <IssueBoard issArr={userIssues}/>
    )
}

export default TeamIssues;
