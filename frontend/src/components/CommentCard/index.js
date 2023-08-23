import { useState } from 'react';
import './CommentCard.css'


function CommentCard({ comment, team, Comments }) {
    const [replying, setReplying] = useState(false)


    return (
        <div className='commentCard'>
            <p>{team.Members[comment.posterId].username}</p>
            <p>{comment.comment}</p>
            {comment.Replies.map(rep => {
                const reply = Comments[rep];
                return (
                    <div>
                        <p>{team.Members[reply.posterId].username}</p>
                        <p>{reply.comment}</p>
                    </div>
                )
            })}
            {comment.Replies.length &&
                <form className='repliesIn1'>
                    <input className='repliesIn' type='string' placeholder='Leave a reply...' ></input>
                    <button>Submit</button>
                </form>
            }
        </div>
    )
}
export default CommentCard;
