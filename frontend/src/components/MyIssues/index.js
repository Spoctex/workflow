import './MyIssues.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IssueBoard from '../IssueBoard';


function MyIssues() {
    const user = useSelector(state => state.session.user);
    const teams = useSelector(state => state.teams);
    const [userIssues, setUserIssues] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        let issues = [];
        Object.values(teams).forEach(team => {
            Object.values(team.Projects).forEach(proj => {
                Object.values(proj.Issues).forEach(iss => {
                    if (iss.assignedId === user.id || iss.creatorId === user.id) issues.push([iss, proj, team])
                })
            })
        });
        setUserIssues(issues)
    }, [teams])

    return (
        <>
        {/* <button onClick={()=>{setFilter('all')}}>All</button>
        <button onClick={()=>{setFilter('assignedId')}}>Assigned</button>
        <button onClick={()=>{setFilter('creatorId')}}>Created</button> */}
        <IssueBoard issArr={userIssues.filter(iss=>{
                if (filter === 'all') return iss;
                else if (iss[0][filter]===user.id) return iss;})}/>
        </>
    )
}
export default MyIssues;
