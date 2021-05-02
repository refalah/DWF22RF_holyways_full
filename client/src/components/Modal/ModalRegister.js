import React, {useContext, useState} from 'react'
import ReactDom from 'react-dom'
import ModalLogin from '../Modal/ModalLogin'
import { ModalContext } from '../../contexts/modalContext'
import { UserContext } from '../../contexts/userContext'
import { API, setAuthToken } from "../../config/api";
import { Link, useHistory } from "react-router-dom";

function ModalRegister({opens, onClose}) {
   

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const { fullName, email, password } = form;

    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const [ , dispatch] = useContext(UserContext)
    const handleOpenLogin = () => {
        dispatch({
            type: "OPENLOGIN"
        })
    }
    const handleCloseRegister = () => {
        dispatch({
            type: "CLOSEREGISTER"
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
                fullName,
                email,
                password
            });

            const response = await API.post("/register", body, config);

            setMessage(response.data.message);

            setAuthToken(response.data.data.user.token);

            dispatch({
                type: "REGISTER_SUCCESS",
                payload: response.data.data.user
            });

            onClose()

            // router.push("/");

        } catch (error) {
            console.log(error);
        }
    }

    if (!opens) return null

    return ReactDom.createPortal (
        <>
             {/* {state.isVisibleRegister ? (  */}
                 <div>
                <div className='dark-overlay' onClick={onClose}></div>
                <div className='modal-register'>
                    <div className='modal-sample-content'>
                        <div className='modal-header'>
                            <h1>Register</h1>
                            {message && (
                                <div class="alert alert-danger py-1" role="alert">
                                    <small>{message}</small>
                                </div>
                            )}
                        </div>
                        
                        <form onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(e);
                        }}>
                        <div className='input-group-sample'>
                            <input type='email' name='email' placeholder='Email' className='email-input grab-input' onChange={(e) => onChange(e)}></input>
                            <input type='password' name='password' placeholder='Password' className='password-input grab-input' onChange={(e) => onChange(e)}></  input>
                            <input type='text' name='fullName' placeholder='Full Name' className='name-input grab-input' onChange={(e) => onChange(e)}></input>

                        </div>
                        <button type='submit' style={{textAlign: 'center'}} className='modal-sample-link'>Register</button>
                        <p style={{textAlign: 'center'}}>Already have an account ? 
                            <span onClick={() => {
                                handleOpenLogin();
                                handleCloseRegister();
                            }} style={{fontWeight: "bold", cursor: "pointer", marginLeft: "5px"}}>
                                Click Here
                            </span>
                        </p>
                        </form>
                    </div>
                </div>
                 </div>
               
                 {/* ) : (  */}
                    {/* <div>
                        <div className='nav-links' onClick={() => {setIsOpen(true)}}>Login</div>
                        <ModalLogin open={isOpen} onClose={() => setIsOpen(false)}></ModalLogin>
                    </div> */}
                {/* )} */}
            
        </>,
        document.getElementById('portal')
    )
}

export default ModalRegister
