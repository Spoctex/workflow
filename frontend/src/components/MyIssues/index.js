import { useEffect, useState } from 'react';
import IssueCard from '../IssueCard';
import './MyIssues.css';
import { useSelector } from 'react-redux';


function MyIssues() {
    const user = useSelector(state => state.session.user);
    const teams = useSelector(state => state.teams);
    const [userIssues, setUserIssues] = useState([]);
    const [filter, setFilter] = useState('all')
    useEffect(() => {
        let issues = [];
        Object.values(teams).forEach(team => {
            Object.values(team.Projects).forEach(proj => {
                Object.values(proj.Issues).forEach(iss => {
                    if (iss.assignedId === user.id || iss.creatorId === user.id) issues.push([iss, proj.name, team.name])
                })
            })
        });
        setUserIssues(issues)
        // console.log(issues)
    }, [teams])

    return (
        <>
        <button onClick={()=>{setFilter('all')}}>All</button>
        <button onClick={()=>{setFilter('assignedId')}}>Assigned</button>
        <button onClick={()=>{setFilter('creatorId')}}>Created</button>
            {userIssues.map(iss => {
                let card = (<IssueCard issue={iss[0]} projectName={iss[1]} teamName={iss[2]} />)
                if (filter === 'all') return card;
                else if (iss[0][filter]===user.id) return card;
            })}
        </>
    )
}
export default MyIssues;
