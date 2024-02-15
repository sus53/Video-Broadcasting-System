import React from 'react'
import Polo from "/Polo - The Gentlemans' Sport.mp4"
import ImpossibleMoment from '/Impossible Moments in Sports.mp4'
import NBAMoments from '/NBA Epic Moments.mp4'
import EmotionalWinning from '/Emotional Winnings in Sports.mp4'
import FunnyMoments from '/Most Funny Moments in Sports.mp4'
import './suggestion.scss'
import { PlayCircleFilledOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SelectVideo } from '../../reducers/Index'

function Hsuggestion({ title }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const username = useSelector((state) => state.User.username)

    const VideoHandler = (e, title) => {
        e.preventDefault();
        if (!username) {
            navigate('/login')
            return;
        };
        navigate('/video');
        dispatch(SelectVideo({ selectedVideo: { title: title, live: true } }));
    }

    return (
        <div className='Hsuggestion'>
            <div className='head'>
                {title}
            </div>
            <div className='body'>
                <div className="item">
                    <div className='item-video'>
                        <video src={Polo} autoPlay muted loop />
                    </div>
                    <div className='item-video-controls'>
                        <button onClick={(e) => VideoHandler(e, "Polo - The Gentlemans' Sport.mp4")} ><PlayCircleFilledOutlined className='icon'></PlayCircleFilledOutlined></button>
                    </div>
                    <div className='item-video-title'>
                        Polo - The Gentlemen's Sport
                    </div >
                </div>
                <div className="item">
                    <div className='item-video'>
                        <video src={ImpossibleMoment} autoPlay muted loop />
                    </div>
                    <div className='item-video-controls'>
                        <button onClick={(e) => VideoHandler(e, "Impossible Moments in Sports.mp4")} ><PlayCircleFilledOutlined className='icon'></PlayCircleFilledOutlined></button>
                    </div>
                    <div className='item-video-title'>
                        Impossible Moments in Sports
                    </div >
                </div>
                <div className="item">
                    <div className='item-video'>
                        <video src={NBAMoments} autoPlay muted loop />
                    </div>
                    <div className='item-video-controls'>
                        <button onClick={(e) => VideoHandler(e, "NBA Epic Moments.mp4")} ><PlayCircleFilledOutlined className='icon'></PlayCircleFilledOutlined></button>
                    </div>
                    <div className='item-video-title'>
                        NBA Epic Moments
                    </div >
                </div>
                <div className="item">
                    <div className='item-video'>
                        <video src={EmotionalWinning} autoPlay muted loop />
                    </div>
                    <div className='item-video-controls'>
                        <button onClick={(e) => VideoHandler(e, "Emotional Winnings in Sports.mp4")} ><PlayCircleFilledOutlined className='icon'></PlayCircleFilledOutlined></button>
                    </div>
                    <div className='item-video-title'>
                        Emotional Winnings in Sports
                    </div >
                </div>
                <div className="item">
                    <div className='item-video'>
                        <video src={FunnyMoments} autoPlay muted loop />
                    </div>
                    <div className='item-video-controls'>
                        <button onClick={(e) => VideoHandler(e, "Most Funny Moments in Sports.mp4")} ><PlayCircleFilledOutlined className='icon'></PlayCircleFilledOutlined></button>
                    </div>
                    <div className='item-video-title'>
                        Most Funny Moments in Sports
                    </div >
                </div>
            </div>
        </div>
    )
}

export default Hsuggestion