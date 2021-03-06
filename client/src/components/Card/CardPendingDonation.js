import React, {useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import ModalApprove from '../Modal/ModalApprove'

const CardPendingDonation = ({donoData, funcLoad}) => {
    const params = useParams();
    const {id} = params;
    const {donateAmount, status, proofAttachment, createdAt} = donoData;

    const date = new Date(createdAt);
    const newFormDate = new Intl.DateTimeFormat(['ban', 'en'], { dateStyle: 'full' }).format(date)
    
    //funcLoad()
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
                        <p>{newFormDate}</p>
                    </div>
                    <div className='list-donation-total'>
                        <p>{donateAmount}</p>
                        {status == "Pending" ? (
                        <button className='status-donate' onClick={() => {setIsOpen(true)}}>View</button>
                        ) : (
                            <div></div>
                        )}
                        <ModalApprove donoData ={ donoData } loadDono = {funcLoad} open={isOpen} onClose={() => setIsOpen(false)}></ModalApprove>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default CardPendingDonation
