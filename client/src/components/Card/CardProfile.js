
const CardProfile = ({user}) => {
    const {fullName, email, id} = user;
    return (
        <div>
            <div className='profile-card'>
                <img src='/profile-test.png' className=''></img>
                <div className='profile-data'>
                    <div className='name'>
                        <p className='red-title'>Full Name</p>
                        <p>{user.fullName}</p>
                    </div>
                    <div className='email'>
                        <p className='red-title'>Email</p>
                        <p>{email}</p>
                    </div>
                    <div className='phone'>
                        <p className='red-title'>Phone</p>
                        <p>{id}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProfile
