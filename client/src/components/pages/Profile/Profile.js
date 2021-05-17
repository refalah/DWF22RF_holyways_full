import React, {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import History from '../../Card/CardHistory'
import CardProfile from '../../Card/CardProfile'
import {API} from '../../../config/api'
import {io} from 'socket.io-client'

function Profile() {
    
    const router = useHistory();

    const [user, setUser] = useState([]);
    const [funds, setFunds] = useState([]);
    const [donos, setDonos] = useState([]);

    const loadUser = async () => {
        try {
            const response = await API.get(`/profile`);
            setUser(response.data.data.users);
        } catch (error) {
            console.log(error);
        }
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

    console.log(user);

    const goEditProfile = () => {
        router.push('edit-profiles');
    }

    return (
        <>
            <div className="container mt-5">
                 <div className='fund-header' style={{
                     marginBottom: "50px"
                 }}>
                    <h4>My Profile</h4>
                    <button onClick={goEditProfile}><a>Edit Profile</a></button>
                </div>
                <div className="profile-container">
                    <CardProfile user = {user}/>
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
