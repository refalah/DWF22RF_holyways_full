import React, {useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import ModalApprove from '../Modal/ModalApprove'

const CardPendingDonation = ({donoData}) => {
    const params = useParams();
    const {id} = params;
    const {donateAmount, status, proofAttachment, createdAt} = donoData;

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className='list-donation mb-3'>
                <div className='list-donation-content'>
                    <div className='list-donation-name'>
                        {/* User name from userId */}
                        <p>{donoData.User.fullName}</p>
                    </div>
                    <div className='list-donation-date'>
                        <p>{createdAt}</p>
                    </div>
                    <div className='list-donation-total'>
                        <p>{donateAmount}</p>
                        <button className='status-donate' onClick={() => {setIsOpen(true)}}>View</button>
                        <ModalApprove donoData ={ donoData } open={isOpen} onClose={() => setIsOpen(false)}></ModalApprove>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default CardPendingDonation
