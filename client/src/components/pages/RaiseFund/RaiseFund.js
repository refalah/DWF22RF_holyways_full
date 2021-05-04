import React, {useContext, useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { UserContext } from '../../../contexts/userContext'
import Card from '../../Card/Card'
import donateDatas from '../../../fakeData/donateData.json'
import { API } from "../../../config/api";
require('dotenv').config();

function RaiseFund() {
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

    const goToNewFund = () => {
        router.push('/new-fund');
    }

    return (
        <>
            <div className='container mt-5'>
                <div className='fund-header'>
                    <h3>My Raised Fund</h3>
                    <button onClick={goToNewFund}><a>Make Raise Fund</a></button>
                </div>
                <div className='card '>
                <div className='card-body card-fund'>
                    <div className='row'>
                        {funds&&funds.map((fund, index) => (
                            <div className='col-sm-4' key={fund.id + index}>
                                <Card fundData = { fund } btnName = { 'View Fund' } routeName = { "fund" } />
                            </div>
                        ))}
                        
                    </div>
                </div>
                </div>
                
            </div>
        </>
    )
}

export default RaiseFund