import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
//import Input from 'reactstrap'
import { Form, FormFile } from "react-bootstrap";
import { API } from "../../../config/api";

const NewFund = () => {
    const router = useHistory();

    const [form, setForm] = useState({
        title: "",
        thumbnail: null,
        goal: "",
        description: ""
    });

    const [message, setMessage] = useState('');

    const { title, thumbnail, goal, description } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value
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
            formData.append("imageFile", form.thumbnail, form.thumbnail.name)
            formData.set("goal", form.goal);
            formData.set("description", form.description);
           

            const response = await API.post("/fund", formData, config);

            setMessage(response.data.message);

            if(response.data.status === "failed"){
                router.push('/new-fund')
            } else {
                router.push("/raise-fund");
            }

            

        } catch (error) {
            console.log(error);
        }
    }

    const [chosenFile, setChosenFile] = useState()
   
    useEffect(() => {
        if(!form.thumbnail){
            setChosenFile(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(form.thumbnail);
        setChosenFile(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);

    }, [form.thumbnail])

    return (
        <div>
            <div className='container mt-5'>
                <div className='fund-header card-fund'>
                    <h3>Make Raise Fund</h3>
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
                    <Form.Control type="text" placeholder="Title" name="title" onChange={(e) => onChange(e)}/>
                    <br />
                  
                    <input type="file" id="add-thumb" name="thumbnail" onChange={(e) => onChange(e)} hidden/>
                    <label for="add-thumb" id="label-thumb">Attach Thumbnail</label>
                    <br></br>                    
                    {<img src={chosenFile} style={{
                        maxHeight: "200px",
                        padding: "10px 0"
                    }}/>}
                    <br />
                    <Form.Control type="number" placeholder="Goals Donation" name="goal" onChange={(e) => onChange(e)}/>
                    <br />
                    <Form.Control as="textarea" type="text" placeholder="Description" rows={10} name="description" onChange={(e) => onChange(e)}/>
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



export default NewFund
