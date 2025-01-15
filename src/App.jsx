import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import DescriptionMsg from './components/overlayDescription';
import ItemCard from './components/itemCard';
import Header from './components/header';
import Aside from './components/Aside';
import Details from './itemPage'; 


function App() {
  const [itemsData, setItemsData] = useState([]);
  const [favoriteItems, setFavouriteItems] = useState(() => {
    return JSON.parse(localStorage.getItem("favourite")) || [];
  });

  const [displayItem, setdisplayItem] = useState(false);
  const [pending, setPending] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [deleteMode, setDeleteMode] = useState(true);

  useEffect(() => {
    localStorage.setItem("displayState", JSON.stringify(displayItem));
  }, [displayItem]);

  useEffect(() => {
    const products = async () => {
      try {
        setPending(true);
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setItemsData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setPending(false);
      }
    };
    products();
  }, []);

  useEffect(() => {
    setProductCount(favoriteItems.length);
  }, [favoriteItems]);

  return (
    <div>
      <section className='px-4 md:px-6 lg:px-12'>
        {pending && <DescriptionMsg />}
        <Header productCount={productCount} setdisplayItem={setdisplayItem} displayItem={displayItem} />
        <Aside setdisplayItem={setdisplayItem} displayItem={displayItem} setFavouriteItems={setFavouriteItems} favoriteItems={favoriteItems} setDeleteMode={setDeleteMode} deleteMode={deleteMode} />

        <Routes>
          {/* The homepage, which displays ItemCard */}
          <Route 
            path='/' 
            element={<ItemCard itemsData={itemsData} favoriteItems={favoriteItems} setFavouriteItems={setFavouriteItems} />} 
          />
          
          {/* Route for item details page */}
          <Route 
            path='/item/:id' 
            element={<Details favoriteItems={favoriteItems} setFavouriteItems={setFavouriteItems} />} 
          />
       
        </Routes>
      </section>
    </div>
  );
}

export default App;
