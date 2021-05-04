import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {convertToRupiah} from '../../../utils/index'
import ModalDonate from '../../Modal/ModalDonate'
import CardListDonation from '../../Card/CardListDonation'
import PendingDonation from '../../Card/CardPendingDonation'
import listDonates from '../../../fakeData/listDonate.json'
import pendingDonates from '../../../fakeData/penDonate.json'
import { API } from "../../../config/api";

const ViewFund = () => {
    const params = useParams();
    const {id} = params;

    const [funds, setFunds] = useState([]);

   

    const loadFund = async () => {
        try {
            const response = await API.get(`/fund/${id}`);
            setFunds(response.data.data.funds);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadFund();
    }, []);


    const [isOpen, setIsOpen] = useState(false);

    const image_url = `http://localhost:5000/uploads/${funds.thumbnail}`
    const goal = `Rp. ${funds.goal}`

    return (
        <>
           <div className="container mt-5">
                <div className="detail-card card-fund mb-5">
               
               
                    <img src={image_url} className='card-fund'></img>
                    {/* {funds.map(fund =>  */}
                    <div className='detail-container'>
                        <h1>{funds.title}</h1>
                        <div className='progress'>
                            {/* <p>{goal} </p> */}
                            <p>{funds.goal && convertToRupiah(funds.goal)} </p>
                            <p style={{
                                fontSize: "12px"
                            }}> gathered from </p>
                            <p> Total Goal</p>
                        </div>
                        <div className='progressBar'>
                            <div className='red-team'></div>
                            <div className='grey-team'></div>
                        </div>
                        <p className="donate-info">{funds.description}</p>
                        <button onClick={() => {setIsOpen(true)}}><a>Donate</a></button>
                        <ModalDonate open={isOpen} onClose={() => setIsOpen(false)}></ModalDonate>
                    </div>
                    {/* )} */}
                </div>
                
               <h1 className='mb-4' style={{marginTop: "100px"}}>List Donation</h1>
                {/* <CardListDonation />
                <CardListDonation /> */}
                {listDonates.map((listDonate, index) => (
                    <div key={listDonate.id + index}>
                        <CardListDonation listDonate={ listDonate }/>
                    </div>
                ))}

                <h1 className='mb-4' style={{marginTop: "40px"}}>Donation has not been approved</h1>
                    {/* <CardListDonation />
                    <CardListDonation /> */}
                    {pendingDonates.map((pendingDonate, index) => (
                        <div key={pendingDonate.id + index}>
                            <PendingDonation pendingDonate={ pendingDonate }/>
                        </div>
                    ))}
                </div> 
        </>
    )
}

export default ViewFund
