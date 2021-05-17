import React, {useState, useContext, useEffect} from 'react'
import {API} from '../../config/api'

const CardProfile = ({user}) => {


    console.log(user);

    return (
        <div>
            <div className='profile-card'>
                {!user.picture ? (
                    <img src='/profile-test.png' className=''></img>
                ) : (
                    <img src={`http://localhost:5000/uploads/${user.picture}`} className=''></img>
                )}
                <div className='profile-data'>
                    <div className='name'>
                        <p className='red-title'>Full Name</p>
                        <p>{user.fullName}</p>
                    </div>
                    <div className='email'>
                        <p className='red-title'>Email</p>
                        <p>{user.email}</p>
                    </div>
                    <div className='phone'>
                        <p className='red-title'>Phone</p>
                        <p>{user&&user.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProfile
