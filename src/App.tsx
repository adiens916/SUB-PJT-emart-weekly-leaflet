import { useRef, useState } from 'react';

// import NavigationBar from './components/NavigationBar';
// import Intro from './components/Intro';
// import ItemFilter from './components/ItemFilter';
import ItemList from './components/ItemList';

import { useIntersectionObserver } from './hook/useIntersectionObserver';
import { getItemListByPage } from './api';
import { ItemType } from './types';
import './App.css';

function App() {
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pageCount = useRef<number>(1);

  async function loadItemList() {
    setIsLoading(true);

    const newItemList = await getItemListByPage(2, pageCount.current);

    setItemList((itemList) => [...itemList, ...newItemList]);
    pageCount.current += 1;

    setIsLoading(false);
  }

  const setObservationTarget = useIntersectionObserver(loadItemList);

  return (
    <>
      <ItemList itemList={itemList} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && <div ref={setObservationTarget}></div>}
    </>
  );
}

export default App;
