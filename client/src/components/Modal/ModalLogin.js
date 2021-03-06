import React, {useContext, useState} from 'react'
import { UserContext } from '../../contexts/userContext'
import ReactDom from 'react-dom'
import { API, setAuthToken } from "../../config/api";
import { Link, useHistory } from "react-router-dom";

function ModalLogin({open, onClose}) {

    const router = useHistory();

    const [ state, dispatch] = useContext(UserContext);


    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const { email, password } = form;

    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };


    const handleLogin = () => {
        dispatch({
            type: "LOGIN"
        })
        onClose()
    }
    const handleCloseLogin = () => {
        dispatch({
            type: "CLOSELOGIN"
        })
    }
    const handleOpenRegister = () => {
        dispatch({
            type: "OPENREGISTER"
        })
    }

    const onSubmit = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const body = JSON.stringify({
                email,
                password
            });

            const response = await API.post("/login", body, config);

            setMessage(response.data.message);

            setAuthToken(response.data.data.user.token);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.data.user
            });

            onClose()

            // router.push("/");

        } catch (error) {
            console.log(error);
        }
    }


    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div className='dark-overlay' onClick={onClose}></div>
            <div className='modal-login'>

                <div className='modal-sample-content'>
                    <h1>Login</h1>

                    {message && (
                            <div class="alert alert-danger py-1" role="alert" style={{
                                zIndex: "1",
                                position: "absolute"
                            }}>
                                <small>{message}</small>
                            </div>
                        )}

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(e);
                    }}>
                        
                        <div className='input-group-sample'>
                            
                            <input type='text' name='email' placeholder='Email' className='email-input grab-input'  onChange={(e) => onChange(e)}></input>
                            <input type='password' name='password' placeholder='Password' className='password-input grab-input'  onChange={(e) => onChange(e)}></input>
                        </div>
                        <button type='submit' style={{textAlign: 'center'}} className='modal-sample-link' >Login</button>
                        
                        <p style={{textAlign: 'center'}}>Don't have an account ?
                            <span onClick={() => {
                                    handleCloseLogin();
                                    handleOpenRegister();
                                }} style={{fontWeight: "bold", cursor: "pointer", marginLeft: "5px"}}>
                                    Click Here
                            </span>
                        </p>
                    </form>
                </div>
                   
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default ModalLogin
