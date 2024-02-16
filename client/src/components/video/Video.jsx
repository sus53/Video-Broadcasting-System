import React, { useState } from 'react'
import './video.scss';
import { ThumbUp, ThumbDown, Add, AdjustOutlined } from '@mui/icons-material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddWatch } from '../../functions/Watch';
import { addWatch } from '../../reducers/Watch';
import { AddComment } from '../../functions/Comment'
import { AddCommentReducer } from '../../reducers/Comment';
import { format } from 'timeago.js';
import Vsuggestion from '../suggestions/Vsuggestion';
import ReactPlayer from 'react-player';
import Messi from '../../assets/video/Leo Messi Legendary Momentsd.mp4'

function Video() {

    const [like, setLike] = useState(3);
    const [disLike, setDisLike] = useState(5);
    const [isLike, setIsLike] = useState(true);
    const [isDisLike, setIsDisLike] = useState(true);
    const [isWatch, setIsWatch] = useState(false);

    const selectedVideo = useSelector(state => state.Index.selectedVideo)


    let title = selectedVideo.title;
    console.log(title)
    let live = selectedVideo.live;


    let sport = title;
    let Live = live;

    const dispatch = useDispatch();
    const username = useSelector(state => state.User.username);
    const Watch = useSelector(state => state.Watch.lists);
    const Comment = useSelector(state => state.Comment && state.Comment.comment.filter(item => item.video == sport));


    title = sport.slice(0, -4);

    const [commentObj, setCommentObj] = useState({ username, video: sport });

    const LikeHandler = (value) => {

        if (value) {
            if (isDisLike == false) {
                setDisLike(disLike - 1);
                setIsDisLike(true);
            }
            isLike ? setLike(like + 1) : setLike(like - 1);
            setIsLike(!isLike);
        }
        else {
            if (isLike == false) {
                setLike(like - 1);
                setIsLike(true);
            }
            isDisLike ? setDisLike(disLike + 1) : setDisLike(disLike - 1);
            setIsDisLike(!isDisLike);
        }

    }
    const AddCommentHandler = async (e, username) => {
        e.preventDefault();
        setCommentObj({ ...commentObj, username: username })
        let res = await AddComment(commentObj);
        console.log(username);
        if (res) {
            dispatch(AddCommentReducer({ comment: [...Comment, commentObj] }))
        }
        setCommentObj({ username, video: sport, comment: "" })
    }

    const WishListHandler = async (e) => {
        e.preventDefault();
        const watch = { list: title, username: username };
        const res = await AddWatch(watch);
        if (res) dispatch(addWatch({ lists: [...Watch, title] }));
        setIsWatch(true);
    }

    return (
        <div className='video-page'>
            <div className='video-video'>
                <div>
                    <ReactPlayer url={"/" + sport} width="100%" height="100%" controls={true} playing={true} />
                    {
                        Live ? "" : <div className='live-div' >
                            <AdjustOutlined className='live-icon'></AdjustOutlined>Live
                        </div>
                    }
                </div>
                <div className='title'>
                    {title}{Live}
                    <div className='thumb'>
                        <div><button onClick={() => LikeHandler(true)}><ThumbUp className={isLike ? "icon" : "icon fill-golden scale-m"} ></ThumbUp></button> {like}</div>
                        <div><button onClick={() => LikeHandler(false)}><ThumbDown className={isDisLike ? 'icon' : "icon fill-golden scale-m"}></ThumbDown></button> {disLike}</div>
                        <div><button onClick={(e) => isWatch ? setIsWatch(false) : WishListHandler(e)} ><Add className={isWatch ? 'icon scale-l fill-golden' : "icon scale-s"} ></Add></button></div>
                    </div>
                </div>
                <div className='comments'>
                    <h6>{Comment.length} Comments</h6>
                    <div className='comment-list'>
                        <div className='add-comment'>
                            <input placeholder='Write to comment.......' onChange={(e) => { setCommentObj({ ...commentObj, comment: e.target.value }) }} value={commentObj.comment} />
                            <button onClick={(e) => AddCommentHandler(e, username)} >Add</button>
                        </div>
                        {Comment.length > 0 && Comment.map((comment, i) => (
                            <div key={i} className='comment'>
                                <p>Comment by {comment.username} &nbsp;{format(comment.createdAt)}</p>
                                {comment.comment}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <Vsuggestion />
        </div >
    )
}

export default Video