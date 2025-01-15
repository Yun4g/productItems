import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"




function Header({displayItem, setdisplayItem, productCount}) {



    const toggleAside = () => {
        setdisplayItem(!displayItem)
   
    
      }

    return (
          <header className='   h-32 flex w-full     justify-between  items-center'>
              <div className=' fixed top-0  h-28 flex flex-row backdrop-blur-sm bg-white/30   w-[96%]     rounded-b-xl justify-center gap-2  md:justify-between  items-center'>
                <h1 className=' text-3xl lg:text-7xl w-11/12 flex  justify-center items-center text font-bold text-center text-gray-800'>shopping items</h1>
        
        
                <button onClick={toggleAside} className='  h-16 relative   md:w-44 flex justify-center items-center gap-2 md:gap-3  rounded-lg me-7 md:me-12 sm:text-sm   text-gray-100 font-bold' type="button">
                <FontAwesomeIcon icon={ faCartShopping} className=' text-slate-900  text-2xl' />
                  <span className=' absolute top-0 flex justify-center items-center  text-slate-900   w-6  h-6 rounded-full '>
                    <p>{productCount}</p>
                  </span>
                </button>
              </div>
            </header>
    )
}

Header.propTypes = {
    displayItem : PropTypes.bool.isRequired,
    setdisplayItem : PropTypes.func.isRequired,
    productCount : PropTypes.number.isRequired
}

export default Header