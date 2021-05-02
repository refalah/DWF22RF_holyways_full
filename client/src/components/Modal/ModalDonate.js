import React, {useContext} from 'react'
import { UserContext } from '../../contexts/userContext'
import './ModalDonate.css'
import ReactDom from 'react-dom'

function ModalDonate({open, onClose}) {
    const [ , dispatch] = useContext(UserContext)

    const handleLogin = () => {
        dispatch({
            type: "LOGIN"
        })
        onClose()
    }

    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div className='dark-overlay' onClick={onClose}></div>
            <div className='modal-donate'>
                    <div className='input-group'>
                        <input type='text' placeholder=' Nominal Donation' className='input-nominal'></input>
                    </div>
                    <div className='attach-img'>
                        <button ><a>Attach Payment</a></button>
                        <p>*transfers can be made to holyways accounts</p>
                    </div>
                    <div className='modal-donate-link'>Donate</div>
                   
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default ModalDonate
