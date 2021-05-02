import React, {useState, useContext} from 'react'
import ReactDom from 'react-dom'


import {useParams} from 'react-router-dom'
import pendingDonates from '../../fakeData/penDonate.json'

const ModalApprove = ({open, onClose, pendingDonate}) => {
    // const params = useParams();
    // const {id} = params;

    // const pendingDonate = pendingDonates.find(pendingDonate => pendingDonate.id == id);

    const {name, date, total, image} = pendingDonate;
    
    if (!open) return null
    return ReactDom.createPortal (
        <div>
            <div className='dark-overlay' onClick={onClose}></div>
            <div className='modal-approve'>

                <div className='modal-sample-content'>
                    <h5 style={{
                        fontWeight: "bold"
                    }}>{name}</h5>
                    <div className='input-group-sample' style={{marginTop: "5px"}}>
                        <input type='text' placeholder={total} className='email-input grab-input' readOnly></input>
                    </div>
                    <img src={image} className='img-approve'></img>
                    <div style={{textAlign: 'center'}} className='modal-sample-link'>Approve</div>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default ModalApprove
