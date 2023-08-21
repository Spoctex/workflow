import { useDispatch, useSelector } from 'react-redux';
import './IssueDetails.css'
import { useParams } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import IssueModal from '../IssueModal';
import { removeIssue } from '../../store/teams';
import { useHistory } from 'react-router-dom';


function IssueDetails() {
    const dispatch = useDispatch();
    const { teamId, projId, issueId } = useParams();
    const history = useHistory();
    const teams = useSelector(state => state.teams);
    const team = teams[teamId];
    const project = team?.Projects[projId];
    const issue = teams[teamId]?.Projects[projId].Issues[issueId];

    async function delIssue(issue, teamId) {
        dispatch(removeIssue(issue, teamId))
            .then(() => history.goBack())
    }


    return (
        <div id='issDets'>
            <div id='issId'>
                <p>{team?.name} {'>'} {team?.name.slice(0, 3).toUpperCase()} - {issue?.id}</p>
            </div>
            <div id='lnks'>
                <p>{team?.name.slice(0, 3).toUpperCase()} - {issue?.id}</p>
            </div>
            <div id='issDesc1'>
                <div id='issDesc2'>
                    <div id='issDesc3'>
                        <p id='issTitle'>{issue?.title}</p>
                        <p id={'issDesc'} className={'' + (issue?.description ? '' : 'empty')}>{issue?.description ? issue.description : "Add a description with the 'Edit Issue' button to the right"}</p>
                    </div>
                </div>
            </div>
            <div id='issSts'>
                <p id='Status'>Status </p> <p id='issStatus'> {issue?.status}</p>
                <p id='Priority'>Priority </p> <p id='issPriority' className={'' + (issue?.priority ? '' : 'empty')}> {issue?.priority ? issue.priority : 'No priority'}</p>
                <p id='Label'>Label </p> <p id='issLabel' className={'' + (issue?.label ? '' : 'empty')}> {issue?.label ? issue.label : 'Add label'}</p>
                <p id='projNameLbl'>Project </p> <p id='projName' className={'' + (project?.name !== 'Global' ? '' : 'empty')}> {project?.name != 'Global' ? project?.name : 'Add to a project'}</p>
                {/* <p>Assigned to: {issue.assignedTo}</p> */}
                <OpenModalButton
                    buttonText="Edit Issue"
                    modalComponent={<IssueModal currTeam={team} edit={issue} />}
                />
                <button onClick={() => delIssue(issue, team.id)}>Remove Issue</button>
            </div>
        </div>
    )
}
export default IssueDetails;
