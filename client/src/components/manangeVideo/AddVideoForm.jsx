import { CloseOutlined, DoneOutlined } from '@mui/icons-material'
import React, { useState } from 'react'

function AddVideoForm(prop) {

    const [video, setVideo] = useState({ title: "", category: prop.Category[0] });

    const VideoHandler = (e) => {
        if (e.target.files[0]) {
            prop.setFile(e.target.files[0]);
            setVideo({ ...video, title: e.target.files[0].name })
        }
    }

    return (
        <div className="add-form">
            <div>
                <h3>Add Video</h3>
                <div className='add-form-body'>
                    <div>
                        <span>Select Video : </span>
                        <input type='file' onChange={(e) => VideoHandler(e)}></input>
                    </div>
                    <div>
                        <span>Select Sport : </span>
                        <select defaultValue={prop.Category[0]} onChange={(e) => setVideo({ ...video, category: e.target.value })} >
                            {
                                prop.Category.map((sport, i) =>
                                    <option key={i} value={sport} >
                                        {sport}
                                    </option>)
                            }
                        </select>
                    </div>
                </div>
                <div className='add-form-tail'>
                    <button onClick={(e) => { prop.AddHandler(e, video); }} ><DoneOutlined className='icon' /> Add</button>
                    <button onClick={() => { prop.setIsAdd(false) }} ><CloseOutlined className='icon' />Cancel</button>
                </div>
            </div>
        </div >
    )
}

export default AddVideoForm