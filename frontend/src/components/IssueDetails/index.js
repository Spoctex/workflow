import { useDispatch, useSelector } from 'react-redux';
import './IssueDetails.css'
import { useParams } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import IssueModal from '../IssueModal';
import { issueLabel, issuePriority, issueStatus } from '../enumGlobal';
import { addComment, editIssue, removeIssue, userInfo } from '../../store/teams';
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
    const [title, setTitle] = useState();
    const [titleLive, setTitleLive] = useState('');
    const [description, setDescription] = useState();
    const [status, setStatus] = useState();
    const [label, setLabel] = useState();
    const [priority, setPriority] = useState();
    const [projectId, setProjectId] = useState();
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const focusTimeoutRef = useRef(null);

    const handleFocus = () => {
        clearTimeout(focusTimeoutRef.current);
    };

    const handleBlur = () => {
        focusTimeoutRef.current = setTimeout(async () => {
            if (titleLive.length < 4) {
                setTitleLive(title)
            } else {
                await liveEdit()
            }
        }, 100); // Adjust the delay (in milliseconds) according to your needs
    };

    async function liveEdit() {
        const iss = {
            title: titleLive,
            description,
            status,
            label,
            priority,
            projectId,
            currTeam: team.id,
            id: issue.id,
            oldProj: issue.projectId
        };
        dispatch(editIssue(iss))
            .then(() => history.push(`/teams/${team.id}/projects/${iss.projectId}/issues/${issue.id}`))
    }

    useEffect(() => {
        if (currTeam != teamId) setCurrTeam(teamId);
        setTitle(issue?.title)
        setTitleLive(issue?.title)
        setDescription(issue?.description)
        setProjectId(issue?.projectId)
        setStatus(issue?.status)
        setLabel(issue?.label)
        setPriority(issue?.priority)
    }, [teamId, issue?.id])

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
            projId: project.id,
            teamId: team.id
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
                        <input type='string' id='issTitle'
                            placeholder='Issue title'
                            value={titleLive}
                            onChange={(e) => { if (e.target.value.length < 51) setTitleLive(e.target.value) }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}  ></input>
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
                                <button id='commSubmit' type='submit'>Submit</button>
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
                {/* <p id='Status'>Status </p>
                <select  id='issStatus' value={status}
                onChange={(e) => setStatus(e.target.value)}>
                    {issueStatus.map(stat => (
                        <option value={stat}>{stat}</option>
                    ))}
                </select>
            <p id='Priority'>Priority </p>
                <select id='issPriority' className={'' + (issue?.priority ? '' : 'empty')} value={priority}
                onChange={(e) => setPriority(e.target.value === 'Priority' ? null : e.target.value)}>
                    <option value={null}>No priority</option>
                    {issuePriority.map(prior => (
                        <option value={prior}>{prior}</option>
                    ))}
                </select>
            <p id='Label'>Label </p>
                <select id='issLabel' className={'' + (label ? '' : 'empty')} value={label}
                onChange={(e) => setLabel(e.target.value === 'Label' ? null : e.target.value)}>
                    <option value={null}>Add label</option>
                    {issueLabel.map(label => (
                        <option value={label}>{label}</option>
                    ))}
                </select>
            <p id='projNameLbl'>Project </p>
                <select id='projName' className={'' + (project?.name !== 'Global' ? '' : 'empty')} value={projectId}
                onChange={(e) => setProjectId(e.target.value)}>
                    {team && Object.values(team.Projects).map(proj => {
                        if (proj.name !== 'Global') return (
                            <option value={proj.id}>{proj.name}</option>
                        )
                        return (
                            <option value={proj.id}>Add to a project</option>
                        )
                    }
                    )}
                </select> */}
            </div>
        </div>
    )
}
export default IssueDetails;
