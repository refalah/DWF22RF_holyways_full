import React, {useContext, useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { Form, FormFile } from "react-bootstrap";
import { API } from "../../../config/api";

const EditProfile = () => {

    const router = useHistory();

    const [form, setForm] = useState({
        fullName: "",
        picture: null,
        email: "",
        phone: "",
    });

    const loadUser = async () => {
        try {
            const response = await API.get(`/profile`);
            setForm(response.data.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

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
            formData.set("fullName", form.fullName);
            formData.set("email", form.email);
            formData.append("imageFile", form.picture, form.picture.name)
            formData.set("phone", form.phone);
            
            // formData.set("goal", form.goal);
            // formData.set("description", form.description);
            // console.log(formData)

            const response = await API.patch("/edit-profile", formData, config);

            if(response.data.status === "failed"){
                router.push("/edit-profile")
            } else {
                router.push("/profile");
            }

        } catch (error) {
            console.log(error);
        }
    }

    console.log(form)
    const [chosenFile, setChosenFile] = useState()
   
    // useEffect(() => {
    //     if(form.picture){
    //         setChosenFile(`http://localhost:5000/uploads/${form.picture}`);
    //         return;
    //     }

    //     // const objectUrl = URL.createObjectURL(form.picture);
    //     // setChosenFile(objectUrl);

    //     // return () => URL.revokeObjectURL(objectUrl);

    // }, [form.picture])

    return (
        <div>
             <div className='container mt-5'>
                <div className='fund-header card-fund'>
                    <h3>Edit Profile</h3>
                </div>
               
                <div className='form-container mt-5'>
                <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                        }}>
                <Form.Group formValue={form} className='FormGroup'>
                    <Form.Control type="text" value={form.fullName} name="fullName" onChange={(e) => onChange(e)}/>
                    <br /> 
                    <Form.Control type="email" value={form.email} name="email" onChange={(e) => onChange(e)} readOnly/>
                    <br />
                    <Form.Control type="number" value={form.phone} name="phone" onChange={(e) => onChange(e)}/>
                    <br />
                    <input type="file" id="add-thumb" name="picture" onChange={(e) => onChange(e)} hidden/>
                    <label for="add-thumb" id="label-thumb">Add Picture</label>
                    <br></br>                    
                    {<img src={chosenFile} style={{
                        maxHeight: "200px",
                        padding: "10px 0"
                    }}/>}
                    <br />
                    <div className='btn-container pb-3'>
                        <button type='submit' className='btn-fund'>Edit</button>
                    </div>
                    
                </Form.Group>
                </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
