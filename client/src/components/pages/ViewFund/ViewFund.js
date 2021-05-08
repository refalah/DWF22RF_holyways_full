import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {convertToRupiah} from '../../../utils/index'
import ModalDonate from '../../Modal/ModalDonate'
import CardListDonation from '../../Card/CardListDonation'
import PendingDonation from '../../Card/CardPendingDonation'
import listDonates from '../../../fakeData/listDonate.json'
import { API } from "../../../config/api";
import { useHistory } from "react-router-dom";
import {Dropdown, DropdownButton, Modal, Button} from 'react-bootstrap'

const ViewFund = () => {
    const params = useParams();
    const {id} = params;

    const [funds, setFunds] = useState([]);
    const [donos, setDonos] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const router = useHistory();
   

    const loadFund = async () => {
        try {
            const response = await API.get(`/fund/${id}`);
            setFunds(response.data.data.funds);
        } catch (error) {
            console.log(error);
        }
    }

    const loadDonate = async () => {
        try {
            const response = await API.get(`/donations/${id}`);
            setDonos(response.data.data.donos);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadFund();
        loadDonate();
    }, []);
    
    const editFund = () => {
        router.push(`/edit-fund/${id}`);
    }
    
    const deleteFund = async () => {
        try {
            await API.delete(`/fund/${id}`);

            router.push("/raise-fund");
        } catch (error) {
            console.log(error);
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    const image_url = `http://localhost:5000/uploads/${funds.thumbnail}`
    const goal = `Rp. ${funds.goal}`

    return (
        <>
           <div className="container mt-5">
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    {/* <button onClick={editFund}><a>Edit</a></button>
                    <button onClick={deleteFund}><a>Delete</a></button> */}
                    <DropdownButton id="dropdown-basic-button" title="Options" variant="secondary">
                        <Dropdown.Item  onClick={editFund} >Edit</Dropdown.Item>
                        <Dropdown.Item onClick={handleShow} >Delete</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="detail-card card-fund mb-5">
                <Modal show={show} onHide={handleClose}>
                  {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header> */}
                  <Modal.Body className="sm"><p style = {{
                      fontSize : "20px",
                      padding: "5px"
                  }}>Are you sure you want to delete this fund?</p></Modal.Body>
                  <Modal.Footer>
                   
                    <Button variant="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteFund}>
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>
               
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
                        <ModalDonate open={isOpen} onClose={() => setIsOpen(false)} funcLoad={loadDonate}></ModalDonate>
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
                    {donos&&donos.map((dono, index) => (
                        <div key={dono.id + index}>
                            <PendingDonation donoData = { dono }/>
                        </div>
                    ))}
                </div> 
        </>
    )
}

export default ViewFund
