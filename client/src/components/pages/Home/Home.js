import React, {useContext} from 'react'
import HeroTop from '../../Hero/HeroTop'
import HeroMid from '../../Hero/HeroMid'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from '../../Card/Card'
import { useHistory } from "react-router-dom";
import { UserContext } from '../../../contexts/userContext'
import donateDatas from '../../../fakeData/donateData.json'

function Home() {
    const [ state, dispatch ] = useContext(UserContext);
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
                        {donateDatas.slice(-3).map((donateData, index) => (
                            <div className='col-sm-4' key={donateData.id + index}>
                                <Card donateData={ donateData } btnName = { 'Donate' } routeName = { "donate-detail" }/>
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
