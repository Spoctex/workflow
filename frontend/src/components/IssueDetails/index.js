import { useDispatch, useSelector } from 'react-redux';
import './IssueDetails.css'
import { useParams } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import IssueModal from '../IssueModal';
import { addComment, removeIssue, userInfo } from '../../store/teams';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import { CurrTeamContext } from '../../context/currTeam';
import { useState } from 'react';
import CommentCard from '../CommentCard';


function IssueDetails() {
    const dispatch = useDispatch();
    const { teamId, projId, issueId } = useParams();
    const history = useHistory();
    const teams = useSelector(state => state.teams);
    const user = useSelector(state => state.session.user)
    const { currTeam, setCurrTeam } = useContext(CurrTeamContext);
    // const [commentsDisplayed, setCommentsDisplayed] = useState(new Set())
    const team = teams[teamId];
    const project = team?.Projects[projId];
    const issue = teams[teamId]?.Projects[projId].Issues[issueId];
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (currTeam != teamId) setCurrTeam(teamId);
    }, [teamId])

    async function delIssue(issue, teamId) {
        dispatch(removeIssue(issue, teamId))
            .then(() => history.goBack())
    }

    async function createComment(comment, replyOf = null) {
        await dispatch(addComment({
            issueId: issue.id,
            posterId: user.id,
            replyOf,
            comment,
            projId:project.id,
            teamId:team.id
        }))
    }

    async function onSubmit(e) {
        e.preventDefault();
        setHasSubmitted(true);
        if (!comment) {
            document.getElementById('commentIn').focus();
            setErrors({ comment: 'Please add a comment' });
            return;
        }
        if (comment.length > 400) {
            document.getElementById('commentIn').focus();
            setErrors({ comment: 'Please keep comments under 400 characters in length' });
            return;
        }
        await createComment(comment);
        setErrors({});
        setComment('');
        setHasSubmitted(false);
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
                        <p>Comments</p>
                        {issue?.Comments && Object.values(issue.Comments).map(comment => {
                            if (!comment.replyOf) return (
                                <CommentCard comment={comment} team={team} project={project} Comments={issue.Comments} createReply={createComment} />
                            )
                        })}
                        <form id='commentIn1' onSubmit={onSubmit}>
                            <textarea id='commentIn'
                                type='string'
                                placeholder='Leave a comment...'
                                onInput={(e) => {
                                    e.target.style.height = 0;
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)} />
                            <div id='commAct'>
                                {hasSubmitted && <p className='error'>{errors.comment}</p>}
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
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
