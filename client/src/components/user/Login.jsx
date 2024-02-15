import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../functions/User';
import { addUser } from '../../reducers/User';
import './user.scss'
import Logo from '../../assets/img/Logo.png'

function Login() {

    const [user, setUser] = useState("");
    const [keepSigned, setKeepSigned] = useState(false);
    const [isLogin, setIsLogin] = useState(true)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LoginHandler = async (e) => {
        e.preventDefault();
        const res = await LoginUser(user);
        setIsLogin(res);
        if (res == false) return;
        dispatch(addUser({ username: res.username, isAdmin: res.isAdmin }));
        navigate('/');
    }

    return (
        <div className='user'>
            {isLogin ? "" : <div className='invalid'>"Invalid Email or Password"</div>}
            <form className='form'>
                <div className='logo'>
                    <img src={Logo} />
                </div>
                <div className='heading'>
                    Sign into your Olympics account
                </div>
                <input placeholder='Email' onChange={(e) => { setUser({ ...user, email: e.target.value }); setIsLogin(true) }} />
                <input type="password" placeholder='Password' onChange={(e) => { setUser({ ...user, password: e.target.value }); setIsLogin(true) }} />
                <div className='keepSignedIn'>
                    <div>
                        <input type="checkbox" />
                    </div>
                    <div>
                        Keep me signed in<br></br>
                        <span>
                            By checking this box you won't have to sign in as often on this device. For your security, we recommended only checking this box on your personal devices.
                        </span>
                    </div>
                </div>
                <button onClick={(e) => LoginHandler(e)}>Sign in</button>
                <Link className='link'>Forgot Password?</Link>
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