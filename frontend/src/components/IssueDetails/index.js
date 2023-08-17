import { useDispatch, useSelector } from 'react-redux';
import './IssueDetails.css'
import { useParams } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import IssueModal from '../IssueModal';


function IssueDetails() {
    const dispatch = useDispatch();
    const { teamId, projId, issueId } = useParams();
    const teams = useSelector(state => state.teams);
    const team = teams[teamId];
    const project = team?.Projects[projId];
    const issue = teams[teamId]?.Projects[projId].Issues[issueId];
    return (
        <>
            <p>{team?.name.slice(0, 3).toUpperCase()} - {issue?.id}</p>
            <p>Title: {issue?.title}</p>
            <p>Description: {issue?.description}</p>
            <p>Status: {issue?.status}</p>
            <p>Label :{issue?.label}</p>
            <p>Priority: {issue?.priority}</p>
            {/* <p>Assigned to: {issue.assignedTo}</p> */}
            {project != 'Global' && <p>Project: {project?.name}</p>}
            <OpenModalButton
                buttonText="Edit Issue"
                modalComponent={<IssueModal currTeam={team} edit={issue} />}
            />
        </>
    )
}
export default IssueDetails;
