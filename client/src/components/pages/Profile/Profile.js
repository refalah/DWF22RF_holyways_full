import React, {useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import History from '../../Card/CardHistory'
import CardProfile from '../../Card/CardProfile'

function Profile() {

    return (
        <>
            <div className="container mt-5">
                <div className="profile-container">
                    <CardProfile/>
                    <div className='history-container'>
                        <h1>History Donation</h1>
                        <History/>
                        <History/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
