import './TeamIssues.css'
import { useEffect, useState } from 'react';
import IssueCard from '../IssueCard';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { CurrTeamContext } from '../../context/currTeam';
import { useParams } from 'react-router-dom';

function TeamIssues(){
    const user = useSelector(state => state.session.user);
    const teams = useSelector(state => state.teams);
    const {currTeam, setCurrTeam} =  useContext(CurrTeamContext);
    const [userIssues, setUserIssues] = useState([]);
    const [filter, setFilter] = useState('all');
    const {teamId} = useParams();

    useEffect(() => {
        if (currTeam != teamId)setCurrTeam(teamId);
    }, [teamId])

    useEffect(() => {
        let issues = [];
            Object.values(teams[currTeam].Projects).forEach(proj => {
                Object.values(proj.Issues).forEach(iss => {
                    if (iss.assignedId === user.id || iss.creatorId === user.id) issues.push([iss, proj, teams[currTeam]])
                })
            });
        setUserIssues(issues)
    }, [currTeam])

    return (
        <>
            {userIssues.map(iss => {
                let card = (<IssueCard issue={iss[0]} project={iss[1]} team={iss[2]} />)
                if (filter === 'all') return card;
                else if (iss[0][filter]===user.id) return card;
            })}
        </>
    )
}

export default TeamIssues;
