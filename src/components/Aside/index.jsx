import FavouriteItemSection from "../favouriteItemSection"
import PropTypes from "prop-types"



function Aside({setdisplayItem, displayItem,  setFavouriteItems, favoriteItems,  setDeleteMode }) {
    

    const hideAside = () => {
        setdisplayItem(!displayItem)
      }


      
  const RemoveFromFav = (item) => {
    const newFavourite = favoriteItems.filter((favoriteItems) => favoriteItems.id !== item.id);
    setFavouriteItems(newFavourite);
    localStorage.setItem("favourite", JSON.stringify(newFavourite))
    setDeleteMode(true)
  }

    return(
        
            <aside className={`border-2 w-full sm:w-1/2 h-full md:w-2/5 lg:w-1/4 z-40 fixed top-0 right-0 backdrop-blur-sm bg-white/30 p-2 md:p-6 overflow-y-scroll transition-transform duration-300 ease-in-out ${displayItem ? 'translate-x-0' : 'translate-x-full'}`}>
              <section className=' h-[400px]'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-2xl font-bold text-gray-900'>
                    Favourite item
                  </h1>
                  <div onClick={hideAside}>
                    <i className="fa-solid fa-x cursor-pointer text-gray-700"></i>
                  </div>
                </div>
                <FavouriteItemSection favoriteItems={favoriteItems} handleclick={RemoveFromFav}  />
              </section>
            </aside>
    )
}


Aside.propTypes = {
    setdisplayItem : PropTypes.func.isRequired,
    displayItem : PropTypes.func.isRequired,
    setFavouriteItems: PropTypes.func.isRequired,
     favoriteItems: PropTypes.arrayOf(  PropTypes.shape({
            id: PropTypes.number.isRequired,  
            image: PropTypes.string.isRequired,  
             price: PropTypes.number.isRequired,  
               rating: PropTypes.shape({
                       rate: PropTypes.number.isRequired, // Fixed nested structure
        }).isRequired, }) ).isRequired,
    setDeleteMode :  PropTypes.func.isRequired  
}

export default Aside