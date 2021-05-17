import React, {useContext, useEffect, useState} from 'react'
import HeroTop from '../../Hero/HeroTop'
import HeroMid from '../../Hero/HeroMid'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from '../../Card/Card'
import { useHistory } from "react-router-dom";
import { UserContext } from '../../../contexts/userContext'
import donateDatas from '../../../fakeData/donateData.json'
import { API } from "../../../config/api";

function Home() {
    
    const [funds, setFunds] = useState([]);
    const [ state, dispatch ] = useContext(UserContext);

    const router = useHistory();

    const loadFunds = async () => {
        try {
            const response = await API.get("/funds");
            setFunds(response.data.data.funds);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadFunds();
    }, []);
    
    return (
        <>
           <HeroTop></HeroTop> 
           <div className='img-1'></div>
           <div className='img-2'></div>
           <HeroMid></HeroMid>
           
           <div className='donate-container'>
                <h3 className="text-center dono-header">Donate Now</h3>
                <div className='container mt-3'>
               
                <div className='card '>
                <div className='card-body card-fund'>
                    <div className='row'>
                        {funds&&funds.slice(-3).map((fund, index) => (
                            <div className='col-sm-4' key={fund.id + index}>
                                <Card fundData={ fund } btnName = { 'Donate' } routeName = { "fund" }/>
                            </div>
                        ))}
                        
                    </div>
                </div>
                </div>
                
            </div>
           </div>
        </>
    )
}

export default Home
