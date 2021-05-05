import React, {useState, useContext} from 'react'
import ReactDom from 'react-dom'


import {useParams} from 'react-router-dom'
import pendingDonates from '../../fakeData/penDonate.json'

const ModalApprove = ({open, onClose, donoData}) => {
    const {donateAmount, status, proofAttachment, createdAt, image_url} = donoData;
    
    if (!open) return null
    return ReactDom.createPortal (
        <div>
            <div className='dark-overlay' onClick={onClose}></div>
            <div className='modal-approve'>

                <div className='modal-sample-content'>
                    {/* User name from userId */}
                    <h5 style={{
                        fontWeight: "bold"
                    }}>{donoData.User.fullName}</h5>
                    <div className='input-group-sample' style={{marginTop: "5px"}}>
                        <input type='text' placeholder={donateAmount} className='email-input grab-input' readOnly></input>
                    </div>
                    {/* ProofAttachment from fundId */}
                    <img src={image_url} className='img-approve'></img>
                    <div style={{textAlign: 'center'}} className='modal-sample-link'>Approve</div>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default ModalApprove
