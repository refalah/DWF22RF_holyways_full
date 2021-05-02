import React, {useState, useContext} from 'react'
import ModalApprove from '../Modal/ModalApprove'

const CardPendingDonation = ({pendingDonate}) => {
    const {name, date, total} = pendingDonate;

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className='list-donation mb-3'>
                <div className='list-donation-content'>
                    <div className='list-donation-name'>
                        <p>{name}</p>
                    </div>
                    <div className='list-donation-date'>
                        <p>{date}</p>
                    </div>
                    <div className='list-donation-total'>
                        <p>{total}</p>
                        <button className='status-donate' onClick={() => {setIsOpen(true)}}>View</button>
                        <ModalApprove pendingDonate={ pendingDonate } open={isOpen} onClose={() => setIsOpen(false)}></ModalApprove>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default CardPendingDonation
