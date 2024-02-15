import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../functions/User';
import { addUser } from '../../reducers/User';
import './user.scss'
import Logo from '../../assets/img/Logo.png'

function Register() {

    const [user, setUser] = useState();
    const [keepSigned, setKeepSigned] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isPassword, setIsPassword] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const RegisterHandler = async (e) => {
        e.preventDefault();
        if (user.password !== user.cpassword) {
            setIsPassword(false);
            return;
        };

        const res = await RegisterUser(user);
        console.log(res)
        if (!res) return;
        dispatch(addUser({ username: res.username, isAdmin: res.isAdmin }));
        navigate('/');
    }

    return (
        <div className='user'>
            {isLogin ? "" : <div className='invalid'>"Invalid Email or Password"</div>}
            {isPassword ? "" : <div className='invalid'>"Password and Confirm Password does not match"</div>}
            <form className='form f-medium'>
                <div className='logo'>
                    <img src={Logo} />
                </div>
                <div className='heading'>
                    Create your Olympics account
                </div>
                <input type="email" placeholder='Email or mobile phone' onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input placeholder='Username' onChange={(e) => setUser({ ...user, username: e.target.value })} />
                <input type="number" placeholder='Mobile phone number (optional)' onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                <input type="password" placeholder='enter password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <input type="password" placeholder='enter confirm password' onChange={(e) => setUser({ ...user, cpassword: e.target.value })} />
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
                <Link>Terms & Conditions</Link>
                <Link>Privary Policy</Link>
                <button onClick={(e) => RegisterHandler(e)}>Create account</button>
                <Link to={'/login'}>Or sign in</Link>
            </form>
            <p><span>"Welcome to the Fun Olympics 2023"</span></p>
        </div >
    )
}

export default Register