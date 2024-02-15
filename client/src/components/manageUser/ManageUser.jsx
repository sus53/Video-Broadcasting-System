import React, { useEffect, useState } from 'react'
import './manageuser.scss'
import { EditOutlined, DeleteOutlined, DoneOutlined, CloseOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { EditUser, GetUser, RemoveUser } from '../../functions/User'
import { addUsers, removeUser } from '../../reducers/User'
function ManageUser() {

    const Users = useSelector(state => state.User.users);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {

        const GetUsers = async () => {
            const users = await GetUser();
            dispatch(addUsers({ users }))
        }

        GetUsers();
    }, [refresh])

    const DeleteHandler = async (e, id) => {
        e.preventDefault();
        const res = await RemoveUser(id);
        setRefresh(!refresh);
        setIsDelete(false);
    }

    const onOptionClicked = (e, user) => {
        e.preventDefault();
        setCurrentUser({ _id: user._id, username: user.username, email: user.email, phone: user.phone, password: user.password, isAdmin: user.isAdmin })

    }

    const EditHandler = async (e) => {
        e.preventDefault();
        const res = await EditUser(currentUser);
        setRefresh(!refresh)
        setIsEdit(false);
    }

    return (
        <div className='manageUser'>
            <div className='table'>
                <div className='row head'>
                    <div>S.N.</div>
                    <div>Username</div>
                    <div>Email</div>
                    <div>Password</div>
                    <div>Phone</div>
                    <div>IsAdmin</div>
                    <div>Options</div>
                </div>
                {Users && Users.map((user, i) =>
                    <div className='row' key={i}>
                        <div>{i + 1}</div>
                        <div>{(isEdit && currentUser._id == user._id) ? <input onChange={(e) => setCurrentUser({ ...user, username: e.target.value })} value={currentUser.username} /> : user.username}</div>
                        <div>{(isEdit && currentUser._id == user._id) ? <input onChange={(e) => setCurrentUser({ ...user, email: e.target.value })} value={currentUser.email} /> : user.email}</div>
                        <div>{(isEdit && currentUser._id == user._id) ? <input onChange={(e) => setCurrentUser({ ...user, password: e.target.value })} value={currentUser.password} /> : user.password}</div>
                        <div>{(isEdit && currentUser._id == user._id) ? <input onChange={(e) => setCurrentUser({ ...user, phone: e.target.value })} value={currentUser.phone} /> : user.phone}</div>
                        <div>{(isEdit && currentUser._id == user._id) ? <select onChange={(e) => setCurrentUser({ ...user, isAdmin: e.target.value })} value={currentUser.isAdmin} ><option value={"Yes"}>Yes</option><option value={"No"}>No</option></select> : user.isAdmin}</div>
                        <div>
                            {isEdit && currentUser._id == user._id ?
                                <div>
                                    <button onClick={(e) => EditHandler(e)}><DoneOutlined className='icon' /> Yes</button>
                                    <button onClick={() => { setIsEdit(false) }} ><CloseOutlined className='icon' />No</button>
                                </div>
                                :
                                <div>
                                    <button onClick={(e) => { setIsEdit(true); onOptionClicked(e, user) }}><EditOutlined className='icon' />&nbsp;Edit</button>
                                </div>
                            }
                            <div>
                                <button onClick={(e) => { setIsDelete(true); onOptionClicked(e, user) }} ><DeleteOutlined className='icon' />&nbsp;Delete</button>
                                <div className={isDelete && currentUser._id == user._id ? "delete-confirmation" : "d-none"}>
                                    <div>
                                        <span>Do you want to delete "{user.username}"?</span>
                                        <div>
                                            <button onClick={(e) => DeleteHandler(e, user._id)}><DoneOutlined className='icon' />Yes</button>
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

export default ManageUser