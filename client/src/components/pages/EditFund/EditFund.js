import React, {useContext, useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { Form, FormFile } from "react-bootstrap";
import { API } from "../../../config/api";


function EditFund() {
    const params = useParams();
    const {id} = params;
    const [funds, setFunds] = useState([]);
    const [idForUpdate, setIdForUpdate] = useState(null);
    const router = useHistory();
    const [message, setMessage] = useState('');

    const [form, setForm] = useState({
        title: "",
        thumbnail: null,
        goal: "",
        description: ""
    });

    const loadFund = async () => {
        try {
            const response = await API.get(`/fund/${id}`);
            setForm(response.data.data.funds);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadFund();
    }, []);

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
            formData.set("title", form.title);
            formData.append("imageFile", form.thumbnail[0], form.thumbnail[0].name)
            formData.set("goal", form.goal);
            formData.set("description", form.description);
            console.log(formData)

            


            const response = await API.patch(`/fund/${id}`, formData, config);

            //setIdForUpdate(null);

            
            setMessage(response.data.message);

            if(response.data.status === "failed"){
                router.push(`/edit-fund/${id}`)
            } else {
                router.push("/raise-fund");
            }

        } catch (error) {
            console.log(error);
        }
    }

    console.log(form);


    return (
        <div>
            <div className='container mt-5'>
                <div className='fund-header card-fund'>
                    <h3>Edit Fund</h3>
                </div>
                {message && (
                    <div class="alert alert-danger py-1" role="alert" style={{
                        zIndex: "1",
                        position: "absolute"
                    }}>
                        <small>{message}</small>
                    </div>
                )}
                <div className='form-container mt-5'>
                <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                        }}>
                <Form.Group formValue={form} className='FormGroup'>
                    <Form.Control type="text" value={form.title} name="title" onChange={(e) => onChange(e)}/>
                    <br />
                  
                    <input type="file" id="add-thumb" name="thumbnail" onChange={(e) => onChange(e)} hidden/>
                    <label for="add-thumb" id="label-thumb">Attach Thumbnail</label>
                    {/* <span id="file-chosen">{chosenFile}</span> */}
                    <br />
                    <br />
                    <Form.Control type="number" value={form.goal} name="goal" onChange={(e) => onChange(e)}/>
                    <br />
                    <Form.Control as="textarea" type="text" value={form.description} rows={10} name="description" onChange={(e) => onChange(e)}/>
                    <br />
                    <div className='btn-container pb-3'>
                        <button type='submit' className='btn-fund'>Public Fundraising</button>
                    </div>
                    
                </Form.Group>
                </form>
                </div>
            </div>
        </div>
    )
}




export default EditFund
