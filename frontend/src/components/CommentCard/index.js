import { useRef, useState } from 'react';
import './CommentCard.css'


function CommentCard({ comment, team, Comments }) {
    const [reply, setReply] = useState('');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [focused, setFocused] = useState(false);
    const focusTimeoutRef = useRef(null);

    const handleFocus = () => {
        clearTimeout(focusTimeoutRef.current);
        setFocused(true);
    };

    const handleBlur = () => {
        focusTimeoutRef.current = setTimeout(() => {
            if (!reply) {
                setFocused(false);
                setErrors({});
            }
        }, 100); // Adjust the delay (in milliseconds) according to your needs
    };

    async function onSubmit(e) {
        e.preventDefault();
        console.log('hi')
        setHasSubmitted(true);
        if (!reply) {
            document.getElementById(`repIn${comment.id}`).focus();
            setErrors({ reply: 'Please add a comment' });
            return;
        }
        if (reply.length > 400) {
            document.getElementById(`repIn${comment.id}`).focus();
            setErrors({ reply: 'Please keep comments under 400 characters in length' });
            return;
        }
    }

    return (
        <div className='commentCard'>
            <div className='commHead'>
                <p>{team.Members[comment.posterId].username}</p>
                <button
                onClick={() => {
                    setFocused(true);
                    setTimeout(()=>document.getElementById(`repIn${comment.id}`).focus(),100)
                }}>Reply</button>
            </div>
            <p>{comment.comment}</p>
            {comment.Replies.map(rep => {
                const reply = Comments[rep];
                return (
                    <div className='reply'>
                        <div className='commHead'>
                            <p>{team.Members[reply.posterId].username}</p>

                        </div>
                        <p>{reply.comment}</p>
                    </div>
                )
            })}
            {(!!comment.Replies.length || focused) &&
                <form className='repliesIn1' onSubmit={onSubmit}>
                    <textarea className='repliesIn' id={`repIn${comment.id}`}
                        type='string'
                        placeholder='Leave a reply...'
                        onInput={(e) => {
                            e.target.style.height = 0;
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                    // onMouseEnter={cancelBlur}
                    ></textarea>
                    <div className={'replyAct' + (focused ? ' show' : ' hide')}>
                        {hasSubmitted && <p className='error'>{errors.reply}</p>}
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            }
        </div>
    )
}
export default CommentCard;
