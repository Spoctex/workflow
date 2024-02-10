import { useRef, useState } from 'react';
import './CommentCard.css'
import { delComment, editComment } from '../../store/teams';
import { useDispatch, useSelector } from 'react-redux';


function CommentCard({ comment, team, project, Comments, createReply }) {
    const dispatch = useDispatch();
    const [reply, setReply] = useState('');
    const [commEdit, setCommEdit] = useState('');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [hasSubmittedEdit, setHasSubmittedEdit] = useState(false);
    const [focused, setFocused] = useState(false);
    const [editting, setEditting] = useState(false);
    const focusTimeoutRef = useRef(null);
    const user = useSelector(state => state.session.user)

    const handleFocus = () => {
        clearTimeout(focusTimeoutRef.current);
        setFocused(true);
    };

    //comment

    const handleBlur = () => {
        focusTimeoutRef.current = setTimeout(() => {
            if (!reply) {
                setFocused(false);
                setErrors({});
            }
        }, 100); // Adjust the delay (in milliseconds) according to your needs
    };

    async function onSubmitNewReply(e) {
        e.preventDefault();
        setHasSubmitted(true);
        if (!reply) {
            document.getElementById(`repIn${comment.id}`).focus();
            setErrors({ ...errors, replyNew: 'Please add a comment' });
            return;
        }
        if (reply.length > 400) {
            document.getElementById(`repIn${comment.id}`).focus();
            setErrors({ ...errors, replyNew: 'Please keep comments under 400 characters in length' });
            return;
        }
        await createReply(reply, comment.id);
        setErrors({});
        setReply('');
        setHasSubmitted(false);
        setFocused(false);
    }

    async function onSubmitEdit(e) {
        e.preventDefault();
        setHasSubmittedEdit(true);
        if (!commEdit) {
            setErrors({ ...errors, replyEdit: 'Please add a comment' });
            return;
        }
        if (commEdit.length > 400) {
            setErrors({ ...errors, replyEdit: 'Please keep comments under 400 characters in length' });
            return;
        }
        await dispatch(editComment({
            id: editting,
            comment: commEdit,
            issueId: comment.issueId,
            projId: project.id,
            teamId: team.id
        }))
        setErrors({});
        setEditting(false);
        setCommEdit('');
        setHasSubmittedEdit(false);
    }

    async function handleDelete(comm) {
        await dispatch(delComment({
            ...comm,
            projId: project.id,
            teamId: team.id
        }));
    }
    //re-align git branches

    return (
        <div className='commentCard'>
            <div className='commMain'>
                <div className={`commHead ${editting === comment.id ? '' : 'notEditing'}`}>
                    <p>{team.Members[comment.posterId].username}</p>
                    {editting !== comment.id && <div>
                        <button className='commCardButton'
                            onClick={() => {
                                setFocused(true);
                                setTimeout(() => document.getElementById(`repIn${comment.id}`).focus(), 100)
                            }}>Reply</button>
                        {comment.posterId === user.id && <button className='commCardButton' onClick={() => {
                                    setEditting(comment.id);
                                    setCommEdit(comment.comment);
                                }}>Edit</button>}
                        {comment.posterId === user.id && <button className='commCardButton' onClick={() => handleDelete(comment)}>Delete</button>}
                    </div>}
                </div>
                        {editting === comment.id ?
                            <form id='repEdit' className='repliesIn1' onSubmit={onSubmitEdit}>
                                <textarea className='repliesIn'
                                    type='string'
                                    placeholder='Leave a reply...'
                                    onInput={(e) => {
                                        e.target.style.height = 0;
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                    value={commEdit}
                                    onChange={(e) => setCommEdit(e.target.value)} />
                                <div className={'replyAct show'}>
                                    {hasSubmittedEdit && <p className='error'>{errors.replyEdit}</p>}
                                    <button className='commCardButton' type='reset' onClick={(e) => {
                                        e.preventDefault();
                                        setEditting(false);
                                    }}>Cancel</button>
                                    <button className='commCardButton' type='submit'>Submit</button>
                                </div>
                            </form>
                            : <p>{comment.comment}</p>}
            </div>
            {comment.Replies.map(rep => {
                const reply = Comments[rep];
                return (
                    <div className='reply'>
                        <div className={`commHead ${reply.posterId === user.id && editting !== reply.id ? 'userReply' : ''}`}>
                            <p>{team.Members[reply.posterId].username}</p>
                            {editting !== reply.id && <div>
                                {reply.posterId === user.id && <button className='commCardButton' onClick={() => {
                                    setEditting(reply.id);
                                    setCommEdit(reply.comment);
                                }}
                                >Edit</button>}
                                {reply.posterId === user.id && <button className='commCardButton' onClick={() => handleDelete(reply)}>Delete</button>}
                            </div>}
                        </div>
                        {editting === reply.id ?
                            <form id='repEdit' className='repliesIn1' onSubmit={onSubmitEdit}>
                                <textarea className='repliesIn'
                                    type='string'
                                    placeholder='Leave a reply...'
                                    onInput={(e) => {
                                        e.target.style.height = 0;
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                    value={commEdit}
                                    onChange={(e) => setCommEdit(e.target.value)} />
                                <div className={'replyAct show'}>
                                    {hasSubmittedEdit && <p className='error'>{errors.replyEdit}</p>}
                                    <button className='commCardButton' type='reset' onClick={(e) => {
                                        e.preventDefault();
                                        setEditting(false);
                                    }}>Cancel</button>
                                    <button className='commCardButton' type='submit'>Submit</button>
                                </div>
                            </form>
                            : <p>{reply.comment}</p>}
                    </div>
                )
            })}
            {(!!comment.Replies.length || focused) &&
                <form className='repliesIn1' onSubmit={onSubmitNewReply}>
                    <textarea className='repliesIn' id={`repIn${comment.id}`}
                        type='string'
                        placeholder='Leave a reply...'
                        onInput={(e) => {
                            e.target.style.height = 0;
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        onFocus={handleFocus}
                        onBlur={() => handleBlur()}
                        value={reply}
                        onChange={(e) => setReply(e.target.value)} />
                    <div className={'replyAct' + (focused ? ' show' : ' hide')}>
                        {hasSubmitted && <p className='error'>{errors.replyNew}</p>}
                        <button className='commCardButton' type='submit'>Submit</button>
                    </div>
                </form>
            }
        </div>
    )
}
export default CommentCard;
