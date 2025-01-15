import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Create a separate component for item cards
const ItemCard = ({ itemsData, favoriteItems, setFavouriteItems,    setDeleteMode }) => {
    const navigate = useNavigate()
  
    const handleViewDetails = (id) => {
      navigate(`/item/${id}`); 
  };



    const AddToFav = (item) => {
        if (!favoriteItems.find((fav) => fav.id === item.id)) {
          const updatedItem = [...favoriteItems, item]
          setFavouriteItems(updatedItem);
          localStorage.setItem("favourite", JSON.stringify(updatedItem))
    
    
        }
    
        setDeleteMode(false)
    
      }

      const RemoveFromFav = (item) => {
        const newFavourite = favoriteItems.filter((favoriteItems) => favoriteItems.id !== item.id);
        setFavouriteItems(newFavourite);
        localStorage.setItem("favourite", JSON.stringify(newFavourite))
        setDeleteMode(true)
      }
    return (

     <div className=" w-full h-full flex justify-center items-center">
           <section className='h-100 w-11/12  mt-7 grid   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

{
  itemsData.map((item) => (
    <div key={item.id} className='border-2 h-96  rounded-lg overflow-hidden'>
      <div className='h-4/6  border-b-2 border-gray-900 w-full'>
        <img src={item.image} className='h-full w-full object-contain' alt="" />
      </div>
      <div className='p-2'>
        <p className='font-bold'> price: ${item.price}</p>
        <p className='font-bold'>Rating: {item.rating.rate} <span>Count: {item.rating.count}</span> </p>


        <div className='w-full flex items-center justify-center h-1/3'>

          

          
        
                {
                  !favoriteItems.find(fav => fav.id === item.id) ? 
                 (
                  <div className='flex items-center w-full gap-2'>
                      <button onClick={() => AddToFav(item)} className=' h-12 w-1/2 rounded-lg bg-gray-900 text-gray-100 font-bold mt-2' type="button">
                      Add to Fav
                    </button>
                      <button onClick={() => handleViewDetails(item.id)}  className=' h-12 w-1/2 rounded-lg bg-gray-900 text-gray-100 font-bold mt-2' type="button">
                       view Detail
                    </button>
                  </div>
                  ) : (
                    <div className=' w-full '>
                             <button onClick={() => RemoveFromFav(item)} className=' h-12 w-full  rounded-lg bg-gray-900 text-gray-100 font-bold mt-2' type="button">
                      Delete Favourite
                    </button>
                    </div>
                 
                  )
                }
       
              
        </div>
      </div>
    </div>
  ))
}


</section>
     </div>
       
    );
  };

  ItemCard.propTypes = {
    favoriteItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.shape({
            rate: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired, // Assuming count is also part of favorite item structure
        }).isRequired,
    })).isRequired,

    itemsData: PropTypes.arrayOf(  PropTypes.shape({
          id: PropTypes.number.isRequired,  
          image: PropTypes.string.isRequired,  
           price: PropTypes.number.isRequired,  
             rating: PropTypes.shape({
                     rate: PropTypes.number.isRequired, // Fixed nested structure
      }).isRequired, }) ).isRequired,
      AddToFav: PropTypes.func.isRequired,
      RemoveFromFav   : PropTypes.func.isRequired,
      setFavouriteItems : PropTypes.func.isRequired,
      setDeleteMode  : PropTypes.func.isRequired
  };
  

  export default ItemCard