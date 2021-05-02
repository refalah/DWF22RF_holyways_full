import React, {useState, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../contexts/userContext'
import ModalLogin from '../Modal/ModalLogin'

function HeroTop() {
    const [ state, ] = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false)
    const router = useHistory();
    
    return (
        <>
            <div className='hero-container'>
                <div className='hero'>
                    <div className='hero-content'>
                        <h3>While you are still standing, try to reach out to the people who are falling.</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        {!state.isLogin ? (
                            <>
                                <div className='hero-link' onClick={() => {setIsOpen(true)}}>Donate Now</div>
                                <ModalLogin open={isOpen} onClose={() => setIsOpen(false)}></ModalLogin>
                            </>
                        ) : (
                            <div className='hero-link' onClick={() => router.push("/raise-fund")}>Donate Now</div>
                        )}
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroTop
