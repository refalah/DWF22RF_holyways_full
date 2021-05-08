import React, {useContext, useState} from 'react'
import { UserContext } from '../../contexts/userContext'
import './ModalDonate.css'
import {useParams} from 'react-router-dom'
import ReactDom from 'react-dom'
import { API } from "../../config/api";

function ModalDonate({open, onClose, funcLoad}) {
    const params = useParams();
    const {id} = params;
    const [ , dispatch] = useContext(UserContext);

    const [form, setForm] = useState({
        donateAmount: "",
        proofAttachment: null,
    });

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
    };

    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData();
            formData.set("donateAmount", form.donateAmount);
            formData.append("imageFile", form.proofAttachment[0], form.proofAttachment[0].name);

            await API.post(`/donate/${id}`, formData, config);

            funcLoad();
            onClose();

        } catch (error) {
            console.log(error);
        }
    }

    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div className='dark-overlay' onClick={onClose}></div>
            <div className='modal-donate'>
                    {/* <div className='input-group'>
                        <input type='text' placeholder=' Nominal Donation' className='input-nominal'></input>
                    </div>
                    <div className='attach-img'>
                        <button ><a>Attach Payment</a></button>
                        <p>*transfers can be made to holyways accounts</p>
                    </div>
                    <div className='modal-donate-link'>Donate</div>

                    <div className='modal-sample-content'>
                    <h1>Login</h1> */}
                <div className='modal-sample-content'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        
                        <div className='input-group-sample'>
                            
                            <input type='number' name='donateAmount' placeholder='Nominal Donation' className=' grab-input'  onChange={(e) => onChange(e)}></input>

                            <div className='img-proof'>
                                <input type="file" id="add-thumb" name="proofAttachment" onChange={(e) => onChange  (e)} hidden/>
                                <label for="add-thumb" id="label-thumb">Attach Thumbnail</label>
                                <p>*transfers can be made to holyways accounts</p>
                            </div>
                        </div>

                        <button type='submit' style={{textAlign: 'center'}} className='modal-sample-link' >Donate</button>
                       
                    </form>
                    </div>
            </div>
                   
        </>,
        document.getElementById('portal')
    )
}

export default ModalDonate
