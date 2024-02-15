import React, { useEffect, useState } from 'react'
import './manageVideo.scss';
import { EditOutlined, DeleteOutlined, DoneOutlined, CloseOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { AddVideo, GetVideo, RemoveVideo, UploadVideo } from '../../functions/Video';
import AddVideoForm from './AddVideoForm';
import { AddVideoReducer } from '../../reducers/Video';
function ManageVideo() {

    const Video = useSelector(state => state.Video.video);
    const Category = useSelector(state => state.Category.category);
    const dispatch = useDispatch();

    const [file, setFile] = useState("");
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [currentVideo, setCurrentVideo] = useState({});
    const [refresh, setRefresh] = useState(true);

    const AddHandler = async (e, video) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('video', file);
        if (!video) return;

        try {
            let res = await UploadVideo(formData);
            if (res) {
                res = await AddVideo(video);
                dispatch(AddVideoReducer({ video: [...Video, video] }));
            }
        } catch (error) {
            console.error(error);
        }
        setFile("");
        setIsAdd(false)
    };

    const DeleteHandler = async (e, title) => {
        e.preventDefault();
        const deleteId = { title: title };
        await RemoveVideo(deleteId);
        setRefresh(!refresh);
        setIsDelete(false);
    }

    useEffect(() => {
        const FetchVideo = async () => {
            const res = await GetVideo();
            dispatch(AddVideoReducer({ video: res }));
        }
        FetchVideo();
    }, [refresh])


    const onOptionClicked = (e, video) => {
        e.preventDefault();
        setCurrentVideo({ _id: video._id, title: video.title, category: video.category })

    }

    // const EditHandler = async (e) => {
    //     e.preventDefault();
    //     const res = await EditVideo(currentVideo);
    //     setIsEdit(false);
    // }
    return (
        <div className='manageVideo-page'>
            <div className='table'>
                <div className='row head'>
                    <div>S.N.</div>
                    <div>Title</div>
                    <div>Category</div>
                    <div>Options</div>
                </div>
                <div className='add-button'>
                    <button onClick={() => setIsAdd(true)}>
                        +
                    </button>
                    {isAdd ? <AddVideoForm setFile={setFile} Category={Category} AddHandler={AddHandler} setIsAdd={setIsAdd} ></AddVideoForm> : ""}
                </div>
                {Video && Video.map((video, i) =>
                    <div className='row' key={i}>
                        <div>{i + 1}</div>
                        <div>{video.title}</div>
                        <div>{video.category}</div>
                        <div>
                            {isEdit && currentVideo._id == video._id ?
                                <div>
                                    <button><DoneOutlined className='icon' /> Yes</button>
                                    <button onClick={() => { setIsEdit(false) }} ><CloseOutlined className='icon' />No</button>
                                </div>
                                :
                                <div>
                                    <button onClick={(e) => { setIsEdit(true); onOptionClicked(e, video) }}><EditOutlined className='icon' />&nbsp;Edit</button>
                                </div>
                            }
                            <div>
                                <button onClick={(e) => { setIsDelete(true); onOptionClicked(e, video) }} ><DeleteOutlined className='icon' />&nbsp;Delete</button>
                                <div className={isDelete && currentVideo._id == video._id ? "delete-confirmation" : 'd-none'}>
                                    <div>
                                        <span>Do you want to delete "{video.title}"?</span>
                                        <div>
                                            <button onClick={(e) => DeleteHandler(e, video.title)}><DoneOutlined className='icon' /> Yes</button>
                                            <button onClick={() => { setIsDelete(false) }} ><CloseOutlined className='icon' />No</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageVideo