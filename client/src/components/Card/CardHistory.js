import React from 'react'
import {convertToRupiah} from '../../utils/index'
import ReactDom from 'react-dom'

const CardHistory = ({userData}) => {

    const {donateAmount, createdAt, status, id} = userData;
    //console.log(userData.Fund.createdAt);

    return (
        <div>
            <div className='history mb-3'>
                <div className='history-content'>
                    <div className='history-title'>
                        <p>{userData.Fund&&userData.Fund.title}</p>
                    </div>
                    <div className='history-date'>
                        <p>{createdAt}</p>
                    </div>
                    <div className='history-status'>
                        <p>{donateAmount&&convertToRupiah(donateAmount)}</p>
                        {status == "Pending" ? (
                            <div className='status-card' style={{
                                background: "#F6FF72",
                                color: "orange"
                            }}>{status}</div>
                        ) : (
                            <div className='status-card'>{status}</div>
                        )}
                        
                       
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CardHistory
