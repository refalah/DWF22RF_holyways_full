import { Modal } from 'bootstrap'
import { NavDropdown } from "react-bootstrap";
import React, {useState, useContext, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import ModalLogin from '../Modal/ModalLogin'
import ModalRegister from '../Modal/ModalRegister'
import { UserContext } from '../../contexts/userContext'
import { API } from "../../config/api";

function Navbar(){
    const [ state, ] = useContext(UserContext)
    const [ , dispatch] = useContext(UserContext)
    
    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        })
    }
    const handleOpenLogin = () => {
        dispatch({
            type: "OPENLOGIN"
        })
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
    const handleCloseRegister = () => {
        dispatch({
            type: "CLOSEREGISTER"
        })
    }

    const router = useHistory();

    const [user, setUser] = useState([]);
    const loadUser = async () => {
        try {
            const response = await API.get(`/profile`);
            setUser(response.data.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    console.log(user.picture)

    return(
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        
                        <img src="/Icon.svg" alt="icon-holyways" /> 
                    </Link>
                    <ul className="nav-menu">
                        {!state.isLogin ? ( 
                            <>
                            <li className="nav-item">
                                <div className='nav-links' onClick={handleOpenLogin}>Login</div>
                                <ModalLogin open={state.isVisibleLogin} onClose={handleCloseLogin}></ModalLogin>
                            </li>
                            <li>
                                <div className='nav-links-mobile' onClick={handleOpenRegister}>Register </div>
                                <ModalRegister opens={state.isVisibleRegister} onClose={handleCloseRegister}></ModalRegister>
                            </li>
                            </>
                         ) : ( 
                            <>
                           
                            <div style={{
                                display:'flex'
                            }}>

                            {/* {!user.picture ? (
                                <NavDropdown id="basic-nav-dropdown" style={{                                
                                    backgroundImage: `url('http://localhost:5000/uploads/${user.picture}')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: '50% 50%',
                                    marginTop: "20%"
                                }}>
                            ) : (
                                <NavDropdown id="basic-nav-dropdown" style={{                                
                                    backgroundImage: `url('../User.png')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: '50% 50%',
                                    marginTop: "20%"
                                }}>
                            )} */}
                                
                                <NavDropdown id="basic-nav-dropdown" style={{                                
                                    backgroundImage: `url('../User.png')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: '50% 50%',
                                    marginTop: "20%"
                                }}>
                            {/* <NavDropdown id="basic-nav-dropdown" style={{                                
                                backgroundImage: `url('http://localhost:5000/uploads/${user.picture}')`,
                                objectFit: "cover",
                                backgroundSize: "70px",
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '50% 50%',
                                marginTop: "20%"
                            }}> */}
                                <div className='drop-container'>
                                <NavDropdown.Item className='dropdown-item' href="#action/3.1" onClick={() => router.push("/profile")}>
                                    
                                    <div style={{
                                        display:'flex'
                                    }}>
                                        <img src='/user-icon.svg' style={{
                                            height: '20px',
                                            width: '20px',
                                            marginRight: '10px'
                                        }}/>
                                        <div>Profile</div>
                                    </div>
                                    
                                </NavDropdown.Item>
                                <NavDropdown.Item className='dropdown-item' href="#action/3.2" onClick={() => router.push("/raise-fund")}>
                                <div style={{
                                    display:'flex'
                                }}>
                                    <img src='/fund-icon.svg' style={{
                                        height: '20px',
                                        width: '20px',
                                        marginRight: '10px'
                                    }}/>
                                    <div>Raise Fund</div>
                                </div>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className='dropdown-item' href="#action/3.4" onClick={handleLogout}>
                                    <div style={{
                                        display:'flex'
                                    }}>
                                        <img src='/logout-icon.svg' style={{
                                            height: '20px',
                                            width: '20px',
                                            marginRight: '10px'
                                        }}/>
                                        <div className='modal-logout-link' >Logout</div>
                                    </div>
                                </NavDropdown.Item>
                                </div>
                            </NavDropdown>
                                
                            </div>

                            
                            </>
                         )}
                       
                    </ul>
                    
                </div>
            </nav>
        </>
    )
}


export default Navbar