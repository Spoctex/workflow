import './IssueCard.css'
import { useHistory } from 'react-router-dom';


function IssueCard({ issue, project, team }) {
    const history = useHistory();



    return (
            <div className='IssueCard' onClick={() => { history.push(`/teams/${team.id}/projects/${project.id}/issues/${issue.id}`) }}>
                <p className='issCardId'>{team.name.slice(0, 3).toUpperCase()} - {issue.id}</p>
                <p className='issCardTtl'>{issue.title}</p>
                <div className='issCardPs'>
                    <p className='issCardPri'>Priority: {issue.priority ? issue.priority : 'none'}</p>
                    {project.name != 'Global' && <p className='issCardProj'>{project.name}</p>}
                </div>
                {/* <p>Assigned To: {issue.assignedTo ? issue.assignedTo : 'usassigned'}</p> */}
            </div>
    )
}
export default IssueCard
