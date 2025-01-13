import PropTypes from 'prop-types'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrashCan } from "@fortawesome/free-solid-svg-icons";



export default function FavouriteItemSection({ favoriteItems, handleclick}) {
    
    return (
        <section className="rounded-2xl pb-4 mt-4 mb-4">
            <div>
                {favoriteItems.map((savedFav) => (
                    <div key={savedFav.id} className="bg-gray-700 mb-6  h-20    rounded-lg ">
                        <div className="w-full flex  justify-center  gap-4 items-center h-full ">
                         <div className='w-10 h-10 rounded-lg overflow-hidden '>
                            <img src={savedFav.image} className='h-full w-full' alt="" />
                            </div>

                        <div className='flex gap-5'>
                            <p className="text-white">Price: ${savedFav.price}</p>
                            <p className="text-white">rating:  {savedFav.rating.rate} </p>
                        </div>
                        <button onClick={()=> handleclick(savedFav)}>
                        <FontAwesomeIcon icon={faTrashCan} color='white' />

                        </button>
                        </div>
                        
                    </div>
                ))}


             
            </div>
        </section>
    );
}

FavouriteItemSection.propTypes = {
    favoriteItems: PropTypes.arrayOf(  PropTypes.shape({
        id: PropTypes.number.isRequired,  
        image: PropTypes.string.isRequired,  
         price: PropTypes.number.isRequired,  
           rating: PropTypes.shape({
                   rate: PropTypes.number.isRequired, // Fixed nested structure
    }).isRequired, }) ).isRequired,
    descriptive: PropTypes.func.isRequired,
    handleclick : PropTypes.func.isRequired
};
