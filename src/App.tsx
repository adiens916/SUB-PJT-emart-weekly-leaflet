// import NavigationBar from './components/NavigationBar';
// import Intro from './components/Intro';
// import FilterMenu from './components/FilterMenu';
import ItemList from './components/ItemList';
import { getItemList } from './api/itemList';
import './App.css';
import { useEffect, useState } from 'react';
import { ItemType } from './types';

function App() {
  const [itemList, setItemList] = useState<ItemType[]>([]);

  async function loadItemList() {
    const itemList = await getItemList();
    // console.log(itemList);
    setItemList(itemList);
  }

  useEffect(() => {
    loadItemList();
  }, []);

  return (
    <>
      <ItemList />
    </>
  );
}

export default App;
