import { useContext, useState } from 'react';
import { ApplicationContext } from '../../domain/application.store';
import { LikePictureById, unlikePictureById, commentPictureById } from '../../domain/picture/picture.actions';
import { LikeButton, BookmarkButton } from '../buttons';
import './Card.css';


export function Card({ picture }) {
    const { state, dispatch } = useContext(ApplicationContext);
    const [newComment, setNewComment] = useState("");

    const onLike = (pictureId) => {
        if (picture.likedBy && picture.likedBy.find(like => like._id === state.user._id)) {
            unlikePictureById(dispatch, pictureId);
        } else {
            LikePictureById(dispatch, pictureId)
        }
    }

    const onComment = (pictureId) => {
        if (newComment) {
            commentPictureById(dispatch, pictureId, newComment)
        }
    }

    if (!state.user) return null
    return (
        <div className="card">
            <div className="card-img">
                <img src={picture.download_url} />
                <LikeButton onClick={() => { onLike(picture.id) }} isLiked={picture.likedBy && picture.likedBy.find(like => like._id === state.user._id)} />
                <span className="likes">Likes : {picture.likedBy ? picture.likedBy.length : 0}</span>
                <BookmarkButton onClick={() => { }} />
            </div>
            <div className="card-body">
                <h3>
                    Author : {picture.author}
                </h3>
                <div className="card-comments">
                    <>
                    <span>Comments</span>
                    { 
                        (picture.comments && picture.comments.length)
                        ? (<ul>{picture.comments.map((comment, index) => (<li key={index}>{comment.comment}</li>))}</ul>) 
                        : <div>No comments yet.</div>
                    }
                    </>
                </div>
                    <div className="card-comment">
                    { 
                        (picture.comments && picture.comments.length && picture.comments.find(comment => comment.by._id === state.user._id))
                        ? (<div>You already have commented this picture.</div>)
                        : (
                            <>
                                <textarea placeholder="Your comment..." rows={5} onChange={e => {setNewComment(e.target.value)}}></textarea>
                                <button onClick={() => { onComment(picture.id)}}>Send</button>
                            </>
                          )
                    }
                        </div>

            </div>
        </div>
    )

}