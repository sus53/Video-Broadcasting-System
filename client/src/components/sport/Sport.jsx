import React, { useEffect, useState, useRef } from 'react'
import './sport.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateCategory, UploadImage } from '../../functions/Category';
import { useSelector } from 'react-redux';
import { PlayCircleFilledOutlined } from '@mui/icons-material';
function Sport() {

    const sport = useSelector((State) => State.Index.selectedSport);

    const [imagePath, setImagePath] = useState();
    const [isPic, setIsPic] = useState(false);

    const username = useSelector((State) => State.User.username)
    const unFilteredVideo = useSelector((State) => State.Video);
    const Video = unFilteredVideo && unFilteredVideo.video.filter(item => item.category == sport)
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const OpenInputFile = () => {
        inputRef.current.click();
    }

    const ImageHandler = async (image, file, Category) => {
        let category = ({ category: Category, image: image });
        let formData = new FormData();
        formData.append('category', Category);
        formData.append('image', file)
        const res = await UploadImage(formData);
        if (res) {
            await UpdateCategory(category);
        }
        CheckImage();
    }

    const CheckImage = () => {
        try {
            setImagePath('/sport/' + sport + ".jpeg");
            setIsPic(true);
        } catch (error) {
            setIsPic(false);
        }
    }

    useEffect(() => {
        CheckImage();
    }, [sport])

    const VideoHandler = (e, title) => {
        e.preventDefault();
        if (!username) {
            navigate('/login')
            return;
        };
        navigate('/video', { state: { title: title, live: true } });
    }


    return (
        <div className='sport-page'>
            <div className='sport-head'>
                <div className='sport-logo'>
                    {isPic ? <img src={imagePath} /> : <button onClick={() => OpenInputFile()} >+</button>}
                    <input type='file' style={{ display: "none" }} onChange={(e) => { ImageHandler(e.target.files[0].name, e.target.files[0], state); }} ref={inputRef} />
                </div>
                <div className='sport-title'>{sport}</div>
            </div>
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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sport