
import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';
import FavouriteItemSection from './components/favouriteItemSection';
import DescriptionMsg from './components/overlayDescription';



function App() {
  localStorage.removeItem('displayItem');
  localStorage.removeItem('fav')
  const [itemsData, setItemsData] = useState([]);
  const [favoriteItems, setFavouriteItems] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favourite")) || [];
    return storedFavorites;
  });

  const [displayItem, setdisplayItem] = useState(()=>{
      const storedData = JSON.parse(localStorage.getItem("displayState"));
        return  storedData !== null ? storedData : false
  });
  const [selectedItemId, setSelectedItemId] = useState(null);


  const [pending, setPending] = useState(false);




  const toggleAside = () => {
    setdisplayItem(!displayItem)

  }

  const hideAside = () => {
    setdisplayItem(!displayItem)
  }


 



  const hideMSG = ()=>{
    setSelectedItemId(null)
  }  

  useEffect(() => {
   
    localStorage.setItem("displayState", JSON.stringify(displayItem))
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems) )

  }, [displayItem, favoriteItems] )

  useEffect(() => {
    
    const products = async () => {

      try {

        setPending(true)
        const response = await fetch('https://fakestoreapi.com/products');
        const result = await response.json()
        
          if (result.ok) {
             setPending(false)
            
          } else {
            setPending(false)
          }
          setItemsData(result);
      } catch (error) {
        console.log(error)
      }
   

    }
    
    products();
  }, [])





  const AddToFav = (item) => {
    if (!favoriteItems.find((fav) => fav.id === item.id)) {
      setFavouriteItems([...favoriteItems, item])
    }

    setdisplayItem(true)
    console.log(favoriteItems)
  }

  console.log(itemsData)
  return (

    <section className=' px-4 md:px-6 lg:px-12'>
     {pending && <DescriptionMsg/>}  
          
      <div className={` fixed top-0 w-full h-full  justify-center items-center ${selectedItemId === null ? "hidden" : "flex"
        }`}>
        <div className={` bg-gray-900 text-slate-50 descriptive-message transition-opacity duration-300 ease-in-out rounded-xl p-6   md:w-1/3  `}>

          
        <div onClick={hideMSG} className=' absolute top-2 right-2  border w-8 h-8 flex rounded-full justify-center items-center' >
          <i className="fa-solid fa-x cursor-pointer text-white"></i>
        </div>
        </div>


      </div>


      <header className='h-32 flex w-full     justify-between  items-center'>
        <div className=' h-28 flex backdrop-blur-sm bg-white/30 w-full   rounded-b-xl  justify-between  items-center'>
          <h1 className=' md:text-5xl lg:text-7xl w-11/12 flex  justify-center items-center text font-bold text-center text-gray-800'>shopping items</h1>

          <button onClick={toggleAside} className=' h-12 w-full md:w-80    rounded-lg bg-gray-900 me-7 md:me-12 sm:text-sm   text-gray-100 font-bold' type="button">Favourite Item</button>
        </div>
      </header>

      <section className='h-100  mt-7 grid   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

        {
          itemsData.map((item) => (
            <div key={item.id} className='border-2 h-96  rounded-lg overflow-hidden'>
              <div className='h-4/6  border-b-2 border-gray-900 w-full'>
                <img src={item.image} className='h-full w-full' alt="" />
              </div>
              <div className='p-2'>
                <p className='font-bold'> price: ${item.price}</p>
                <p className='font-bold'>Rating: {item.rating.rate} <span>Count: {item.rating.count}</span> </p>


                <div className='w-full flex items-center justify-center h-1/3'>
                  <button onClick={() => AddToFav(item)} className=' h-12 w-2/3 rounded-lg bg-gray-900 text-gray-100 font-bold mt-2' type="button">
                    Add to Favourite
                  </button>
                </div>
              </div>
            </div>
          ))
        }


      </section>


      <aside className={`border-2 w-full sm:w-1/2 h-full md:w-2/5 lg:w-1/4 z-40 fixed top-0 right-0 backdrop-blur-sm bg-white/30 p-6 overflow-y-scroll transition-transform duration-300 ease-in-out ${displayItem ? 'translate-x-0' : 'translate-x-full'}`}>
        <section className=' h-[400px]'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-white'>
              Favourite item
            </h1>
            <div onClick={hideAside}>
              <i className="fa-solid fa-x cursor-pointer text-gray-700"></i>
            </div>
          </div>
          <FavouriteItemSection favoriteItems={favoriteItems}/>
        </section>
      </aside>





    </section>
  );



}

export default App
