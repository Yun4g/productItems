import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Details({favoriteItems, setFavouriteItems}) {
    const { id } = useParams(); 
    const [item, setItem] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`); 

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setItem(result); 
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); 
            }
        };

        fetchItemDetails();
    }, [id]); 




    
    const AddToFav = (item) => {
        if (!favoriteItems.find((fav) => fav.id === item.id)) {
          const updatedItem = [...favoriteItems, item]
          setFavouriteItems(updatedItem);
          localStorage.setItem("favourite", JSON.stringify(updatedItem))
    
    
        }

    }


        const RemoveFromFav = (item) => {
            const newFavourite = favoriteItems.filter((favoriteItems) => favoriteItems.id !== item.id);
            setFavouriteItems(newFavourite);
            localStorage.setItem("favourite", JSON.stringify(newFavourite))
        }

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!item) {
        return <div>Item not found</div>; 
    }

    return (
        <div className="item-details p-3 text-center w-full  flex flex-col justify-center items-center ">
                  <Link to={'/'} className=" border-b-2 border-amber-900 text-orange-800 mb-6"> Go Back to Home </Link>
            <h1 className=" text-2xl font-serif font-bold ">{item.title}</h1>
            <img src={item.image} className=" mt-7 w-80 object-contain" alt={item.title} />
            <p className=" mt-8 mb-4 text-xl font-bold text-orange-800">Price: ${item.price}</p>
            <p className=" mb-4 text-xl font-bold text-orange-800">Rating: {item.rating.rate} ({item.rating.count} reviews)</p> 
            <p className=" text-base md:text-lg text-slate-700 w-[270px] md:w-96">{item.description}</p>
             <div className="w-full">
            {
                  !favoriteItems.find(fav => fav.id === item.id) ? 
                 (
                  <div className=' w-full  '>
                      <button onClick={() => AddToFav(item)} className=' h-12  w-80  rounded-lg bg-gray-900 text-gray-100 font-bold mt-2' type="button">
                      Add to Favourite
                    </button>
                    
                  </div>
                  ) : (
                    <div className=' w-full '>
                             <button onClick={() => RemoveFromFav(item)} className=' h-12  w-80  rounded-lg bg-gray-900 text-gray-100 font-bold mt-2' type="button">
                      Delete Favourite
                    </button>
                    </div>
                 
                  )
                }
             </div>
        </div>
    );
}


   Details.propTypes = {
            favoriteItems: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                image: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                rating: PropTypes.shape({
                    rate: PropTypes.number.isRequired,
                    count: PropTypes.number.isRequired, // Assuming count is also part of favorite item structure
                }).isRequired,
            })).isRequired,
            setFavouriteItems : PropTypes.func.isRequired
   }


 export default Details
