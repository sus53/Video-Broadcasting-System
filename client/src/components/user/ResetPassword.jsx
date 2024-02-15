import React, { useState } from "react";
import "./user.scss";
import { resetPassword } from "../../functions/User";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function ResetPassword() {
    const [passwords, setPasswords] = useState({});
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        if (passwords.password !== passwords.cpassword) return;

        const user = {
            _id: id,
            password: passwords.password,
        };
        const res = await resetPassword(user);
        if (res.message == "User password updated sucessfully") {
            navigate("/login");
        }
        else {
            return
        }
    };

    return (
        <div className="reset-password">
            <form>
                <div className="heading">Reset Password</div>
                <div>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        required="required"
                        onChange={(e) =>
                            setPasswords({ ...passwords, [e.target.name]: e.target.value })
                        }
                        placeholder="Password......................"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="cpassword"
                        id="password"
                        required="required"
                        onChange={(e) =>
                            setPasswords({ ...passwords, [e.target.name]: e.target.value })
                        }
                        placeholder="Confirm Password........."
                    />
                </div>
                <button onClick={(e) => resetPasswordHandler(e)}>Reset Password</button>
            </form>


        </div>
    );
}

export default ResetPassword;
