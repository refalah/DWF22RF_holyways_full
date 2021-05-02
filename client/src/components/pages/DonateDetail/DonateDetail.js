import React, {useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import donateDatas from '../../../fakeData/donateData.json'
import {convertToRupiah} from '../../../utils/index'
import ModalDonate from '../../Modal/ModalDonate'
import CardListDonation from '../../Card/CardListDonation'
import listDonates from '../../../fakeData/listDonate.json'

function DonateDetail() {
    const params = useParams();
    const {id} = params;

    const donateData = donateDatas.find(donateData => donateData.id == id);

    const [isOpen, setIsOpen] = useState(false)

    console.log(donateData)
    return (
        <>
            <div className="container mt-5">
                <div className="detail-card card-fund mb-5">
                    <img src={donateData.image} className='card-fund'></img>
                    <div className='detail-container'>
                        <h1>{donateData.title}</h1>
                        <div className='progress'>
                            <p>{convertToRupiah(donateData.sum)} </p>
                            <p style={{
                                fontSize: "12px"
                            }}> gathered from </p>
                            <p> Total Goal</p>
                        </div>
                        <div className='progressBar'>
                            <div className='red-team'></div>
                            <div className='grey-team'></div>
                        </div>
                        <p className="donate-info">{donateData.info}</p>
                        <button onClick={() => {setIsOpen(true)}}><a>Donate</a></button>
                        <ModalDonate open={isOpen} onClose={() => setIsOpen(false)}></ModalDonate>
                    </div>
                </div>
                
               <h1 className='mb-4' style={{marginTop: "100px"}}>List Donation</h1>
                {/* <CardListDonation />
                <CardListDonation /> */}
                {listDonates.map((listDonate, index) => (
                    <div key={listDonate.id + index}>
                        <CardListDonation listDonate={ listDonate }/>
                    </div>
                ))}
            </div>
            
        </>
    )
}

export default DonateDetail
