import './IssueCard.css'


function IssueCard({ issue, projectName, teamName }) {
    // console.log(issue.id,issue)
    return (

        <div className='IssueCard'>
            <p>Priority: {issue.priority ? issue.priority : 'unset'}</p>
            <p>Status: {issue.status}</p>
            <p>{teamName.slice(0, 3).toUpperCase()} - {issue.id}</p>
            <p>Title: {issue.title}</p>
            {projectName != 'Global' && <p>Project: {projectName}</p>}
            <p>Assigned To: {issue.assignedTo?issue.assignedTo:'usassigned'}</p>
        </div>
    )
}
export default IssueCard
