import { useEffect, useState } from 'react';

// import NavigationBar from './components/NavigationBar';
// import Intro from './components/Intro';
// import FilterMenu from './components/FilterMenu';
import ItemList from './components/ItemList';

import { getItemListByPage } from './api/itemList';
import { ItemType } from './types';
import './App.css';

function App() {
  const [itemList, setItemList] = useState<ItemType[]>([]);

  async function loadItemList() {
    const itemList = await getItemListByPage(1);
    // console.log(itemList);
    setItemList(itemList);
  }

  useEffect(() => {
    loadItemList();
  }, []);

  return (
    <>
      <ItemList itemList={itemList} />
    </>
  );
}

export default App;
