import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import History from '../../Card/CardHistory'
import CardProfile from '../../Card/CardProfile'
import {API} from '../../../config/api'
import {io} from 'socket.io-client'

function Profile() {
    

    const [user, setUser] = useState([]);
    const [funds, setFunds] = useState([]);
    const [donos, setDonos] = useState([]);

    const loadUser = async (socket) => {
        // try {
        //     const response = await API.get(`/profile/`);
        //     setUsers(response.data.data.users);
        // } catch (error) {
        //     console.log(error);
        // }
        // await socket.emit('load user');
        // await socket.on('user', (data) => {
        //     setUser(data);
        // })
    }

    const loadDonate = async () => {
        try {
            const response = await API.get(`/donate/`);
            setDonos(response.data.data.donos);
        } catch (error) {
            console.log(error);
        }
    }

    const loadFund = async () => {
        try {
            const response = await API.get(`/user-fund/`);
            setFunds(response.data.data.funds);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUser();
        loadDonate();
        loadFund();
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="profile-container">
                    <CardProfile/>
                    <div className='history-container'>
                        <h1>History Donation</h1>
                        {donos&&donos.map((dono, index) => (
                            <div key={dono.id + index}>
                                <History userData = {dono}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
