import { useDispatch } from 'react-redux'
import './IssueCard.css'
import { removeIssue } from '../../store/teams';


function IssueCard({ issue, projectName, team }) {
    const dispatch = useDispatch();

    async function delIssue(issue,teamId) {
        dispatch(removeIssue(issue,teamId))
    }



    return (

        <div className='IssueCard'>
            <p>Priority: {issue.priority ? issue.priority : 'unset'}</p>
            <p>Status: {issue.status}</p>
            <p>{team.name.slice(0, 3).toUpperCase()} - {issue.id}</p>
            <p>Title: {issue.title}</p>
            {projectName != 'Global' && <p>Project: {projectName}</p>}
            <p>Assigned To: {issue.assignedTo ? issue.assignedTo : 'usassigned'}</p>
            <button onClick={() => delIssue(issue,team.id)}>Remove Issue</button>
        </div>
    )
}
export default IssueCard
