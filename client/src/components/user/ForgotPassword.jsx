import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './user.scss';
import { forgotPassword } from '../../functions/User';
import { useDispatch } from 'react-redux';
import { AddResponse } from '../../reducers/Index';

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ForgotPasswordHandler = async (e) => {
        e.preventDefault();
        const res = await forgotPassword({ email });
        console.log(res)
        if (res) {
            dispatch(AddResponse({ response: "Password reset link sent to your email" }));
            navigate('/login');
        }
        setIsClicked(true);
    }

    return (

        <div className='user'>
            {!isClicked ? "" : <div className='invalid'>"Invalid Email"</div>}
            <div className='forgot-password'>
                <form>
                    <div>
                        <p>Forgot password?</p>
                    </div>
                    <div className='inputBox'>
                        <input type='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value); setIsClicked(false) }} />
                    </div>
                    <div className='reset-btn'>
                        <button onClick={(e) => ForgotPasswordHandler(e)} >Reset Password</button>
                    </div>
                    <div><Link to='/login' className='link'>Back to Login</Link></div>
                </form>
            </div>
        </div>

    )
}

export default ForgotPassword