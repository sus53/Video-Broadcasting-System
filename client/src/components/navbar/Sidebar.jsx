import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../../reducers/User';
import './navbar.scss';
import { addWatch, removeWatch } from '../../reducers/Watch';
import { GetWatch } from '../../functions/Watch';
import { SelectVideo } from '../../reducers/Index';

function Sidebar({ setIsMenu }) {

    const dispatch = useDispatch();

    const Watch = useSelector(state => state.Watch.lists);
    const User = useSelector(state => state.User);

    const navigate = useNavigate();

    const [isWatchLater, setIsWatchLater] = useState(false);

    const MenuToggler = (e) => {
        let toggle = e.target.className;
        if (toggle === "sidebar") CloseMenu();
    }

    const CloseMenu = () => {
        setIsMenu(false);
    }

    const Logout = () => {
        dispatch(removeUser());
        dispatch(removeWatch());
        CloseMenu();
    }

    const FetchWatch = async () => {


        list = await GetWatch(req);

        if (list) {
            dispatch(addWatch({ lists: list.list }));
        }

    }

    useEffect(() => {

        if (!Watch) FetchWatch();

    }, [])

    const VideoHandler = (e, title) => {
        e.preventDefault();
        dispatch(SelectVideo({ selectedVideo: { title: title + ".mp4", live: true } }));
        navigate('/video');
    }

    return (
        <div className='sidebar' onClick={(e) => MenuToggler(e)}>
            <div className='menu' >
                <div className='head'>
                    <div>Account</div>
                    <button onClick={() => CloseMenu()}>X</button>
                </div>
                <div className='body'>
                    {!User.username
                        ?
                        <>
                            <Link className='link' onClick={() => CloseMenu()} to={'/login'}>Sign in</Link>
                            <Link className='link' onClick={() => CloseMenu()} to={"/register"} >Create Account</Link>
                        </>
                        :
                        <>
                            <Link className='link' onClick={() => setIsWatchLater(!isWatchLater)} >Watch later</Link>
                            <div className={isWatchLater ? 'd-block watch-link' : "d-none"}>
                                {Watch.length > 0 ? Watch.map((watch, i) => <div key={i} onClick={(e) => VideoHandler(e, watch)} >{watch}</div>) : "Nothing Selected"}
                            </div>
                            {
                                User.isAdmin == "Yes"
                                    ?
                                    <>
                                        <Link className='link' onClick={() => CloseMenu()} to={"/managevideo"}>Manage Videos</Link>
                                        <Link className='link' onClick={() => CloseMenu()} to={"/manageuser"}>Manage Users</Link>
                                    </>
                                    :
                                    ""
                            }
                            <Link className='link' onClick={() => Logout()} to={"/"} >Logout</Link>
                        </>
                    }

                </div>
            </div>
        </div >
    )
}

export default Sidebar