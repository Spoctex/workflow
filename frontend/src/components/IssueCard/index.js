import { useDispatch } from 'react-redux'
import './IssueCard.css'
import { removeIssue } from '../../store/teams';
import { useHistory } from 'react-router-dom';


function IssueCard({ issue, project, team }) {
    const dispatch = useDispatch();
    const history = useHistory();

    async function delIssue(issue,teamId) {
        dispatch(removeIssue(issue,teamId))
    }



    return (

        <div className='IssueCard' onClick={()=>{history.push(`/teams/${team.id}/projects/${project.id}/issues/${issue.id}`)}}>
            <p>Priority: {issue.priority ? issue.priority : 'unset'}</p>
            <p>Status: {issue.status}</p>
            <p>{team.name.slice(0, 3).toUpperCase()} - {issue.id}</p>
            <p>Title: {issue.title}</p>
            {project != 'Global' && <p>Project: {project.name}</p>}
            {/* <p>Assigned To: {issue.assignedTo ? issue.assignedTo : 'usassigned'}</p> */}
            <button onClick={() => delIssue(issue,team.id)}>Remove Issue</button>
        </div>
    )
}
export default IssueCard
