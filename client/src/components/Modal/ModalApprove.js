import React, {useState, useContext} from 'react'
import ReactDom from 'react-dom'
import { API } from "../../config/api";

import {useHistory, useParams} from 'react-router-dom'
import pendingDonates from '../../fakeData/penDonate.json'

const ModalApprove = ({open, onClose, donoData}) => {
    const params = useParams();
    const router = useHistory();
    const {id, donateAmount, status, proofAttachment, createdAt, image_url} = donoData;
    

    console.log(status)

    const handleApprove = async () => {
        try {
            await API.patch(`/approve/${id}`);
            router.push(`/fund/${id}`)
            onClose();
        } catch (error) {
            console.log(error);
        }
        console.log(`hello ${id}`)
    }
    
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
                    <div style={{textAlign: 'center'}} onClick={handleApprove} className='modal-sample-link'>Approve</div>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default ModalApprove
