import React from 'react'
import './live.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AdjustOutlined, PlayCircleFilledOutlined } from '@mui/icons-material';

function Live() {

    let navigate = useNavigate();

    const Video = useSelector(state => state.Video.video);

    const VideoHandler = (e, title) => {
        e.preventDefault();
        navigate('/video', { state: { title, live: false } });
    }


    return (
        <div className='live-page'>
            <div className='sport-body'>
                {Video.length > 0 && Video.map((video) => (
                    <div className="item">
                        <div className='item-video'>
                            <video src={require("../../assets/video/" + video.title)} autoPlay muted loop />
                        </div>
                        <div className='item-video-controls'>
                            <button onClick={(e) => VideoHandler(e, video.title)} ><PlayCircleFilledOutlined className='icon'></PlayCircleFilledOutlined></button>
                        </div>
                        <div className='item-video-title'>
                            {video.title}
                        </div >
                        <div className='live-div' >
                            <AdjustOutlined className='live-icon'></AdjustOutlined>Live
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Live