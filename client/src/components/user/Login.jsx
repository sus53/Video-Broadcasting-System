import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../functions/User';
import { addUser } from '../../reducers/User';
import './user.scss'
import Logo from '../../assets/img/Logo.png'
import { GoogleLogin } from '@react-oauth/google';

function Login() {

    const response = useSelector((state) => state.Index.response);
    const [user, setUser] = useState("");
    const [keepSigned, setKeepSigned] = useState(false);
    const [isLogin, setIsLogin] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notify, setNotify] = useState(response ? true : false)
    const LoginHandler = async (e) => {
        e.preventDefault();
        const res = await LoginUser(user);
        setIsLogin(res);
        if (res == false) return;
        dispatch(addUser({ username: res.username, isAdmin: res.isAdmin }));
        navigate('/');
    }

    const googleSignInHandler = async (cred) => {
        const user = { ctoken: cred }
        console.log(cred)
        const res = await LoginUser(user);
        if (res == false) return;
        dispatch(addUser({ username: res.username, isAdmin: res.isAdmin }));
        navigate('/');
    }

    return (
        <div className='user'>
            {!notify ? "" : <div className='invalid'>{response}</div>}
            {isLogin ? "" : <div className='invalid'>"Invalid Email or Password"</div>}
            <form className='form'>
                <div className='logo'>
                    <img src={Logo} />
                </div>
                <div className='heading'>
                    Sign into your Olympics account
                </div>
                <input placeholder='Email' onChange={(e) => { setUser({ ...user, email: e.target.value }); setIsLogin(true); setNotify(false) }} />
                <input type="password" placeholder='Password' onChange={(e) => { setUser({ ...user, password: e.target.value }); setIsLogin(true) }} />
                <button onClick={(e) => LoginHandler(e)}>Sign in</button>
                OR
                <GoogleLogin
                    text="signin_with"
                    size='medium'
                    onSuccess={res => {
                        googleSignInHandler(res.credential);
                    }}

                    auto_select={false}
                />
                <Link className='link' to={'/forgotpassword'}>Forgot Password?</Link>
                <Link className='secondary-btn' to={'/register'}><button>Create your account</button></Link>
                <span>By signing in, you agree to the following:</span>
                <Link>Terms and Conditions</Link>
                <Link>Privary Policy</Link>
            </form>
            <p><span>"Welcome to the Fun Olympics 2023."</span></p>
        </div >
    )
}

export default Login