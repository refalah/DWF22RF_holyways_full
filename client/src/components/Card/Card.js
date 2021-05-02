import React, {useState, useContext} from 'react'
import { useHistory } from "react-router-dom";
import {convertToRupiah} from '../../utils/index'
import { UserContext } from '../../contexts/userContext'
import ModalLogin from '../Modal/ModalLogin'
require('dotenv').config();

const Card = ({ donateData, btnName, routeName}) => {
    //const { id, title, description, sum, image} = donateData;
    const { id, title, goal, description, thumbnail, image_url} = donateData;
    //const image_url= process.env.FILE_PATH + donateData.thumbnail
    // const image_url = `http://localhost:5000/uploads/${thumbnail}`
    console.log(image_url)
    console.log(thumbnail)

    const [ state, ] = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false)

    const router = useHistory();

    const goToPage = () => {
        router.push(`/${routeName}/${id}`);
    };
    
    return (
        <div className='cards mb-5'>
                <div className='card-image-container'>
                    <img src={image_url} alt={thumbnail} className='img-dono'></img>
                </div>
                <div className='card-content'>
                    <div className='card-title'>
                        <h6 style={{
                            minHeight: "40px"
                        }}>{title}</h6>
                    </div>
                    <div className='card-bodies'>
                        <p style={{
                            height: "50px",
                            fontSize: "12px"
                        }}>{description}</p>
                    </div>
                    <div className='progress-bar'>
                        <div className='red-team'></div>
                        {/* <div className='grey-team'></div> */}
                    </div>
                </div>
                
                <div className='btns'>
                    <p>{convertToRupiah(goal)}</p>
                    {!state.isLogin ? (
                            <>
                                <button onClick={() => {setIsOpen(true)}}>{btnName}</button>
                                <ModalLogin open={isOpen} onClose={() => setIsOpen(false)}></ModalLogin>
                            </>
                        ) : (
                            <button onClick={goToPage}>{btnName}</button>
                        )}                   
                </div>
        </div>
    )
}

export default Card
