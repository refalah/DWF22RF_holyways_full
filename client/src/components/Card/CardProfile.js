
const CardProfile = () => {
    return (
        <div>
            <div className='profile-card'>
                <img src='/profile-test.png' className=''></img>
                <div className='profile-data'>
                    <div className='name'>
                        <p className='red-title'>Full Name</p>
                        <p>Kurt Cobain</p>
                    </div>
                    <div className='email'>
                        <p className='red-title'>Email</p>
                        <p>kurt@nirvana.com</p>
                    </div>
                    <div className='phone'>
                        <p className='red-title'>Phone</p>
                        <p>555-1235</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProfile
