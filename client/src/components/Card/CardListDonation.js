
const CardListDonation = ({listDonate}) => {
    const {name, date, total} = listDonate
    return (
        <>
           <div className='list-donation mb-3'>
                <div className='list-donation-content'>
                    <div className='list-donation-name'>
                        <p>{name}</p>
                    </div>
                    <div className='list-donation-date'>
                        <p>{date}</p>
                    </div>
                    <div className='list-donation-total'>
                        <p>{total}</p>
                    </div>
                </div>
            </div> 
        </>
    )
}



export default CardListDonation
