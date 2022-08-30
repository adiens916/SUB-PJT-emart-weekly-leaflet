import { useEffect, useRef, useState } from 'react';
import { Container } from '@mui/material';

import Intro from './components/Intro';
import Header from './components/Header';
import ItemFilter from './components/ItemFilter';
import ItemList from './components/ItemList';

import useIntersect from './hook/useIntersectionObserver';
import { ItemListLoader } from './api';
import { ItemType } from './types';

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [isFullLoaded, setIsFullLoaded] = useState(false);
  const itemListLoader = useRef(new ItemListLoader());
  const categoryIdRef = useRef<number>(0);

  const { setRef } = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await loadItemList();
    observer.observe(entry.target);
  }, {});

  const loadItemList = async () => {
    const newItemList = await itemListLoader.current.getMore();
    console.log(newItemList);

    if (newItemList.length) {
      setItemList((itemList) => [...itemList, ...newItemList]);
    } else {
      setIsFullLoaded(true);
    }
  };

  useEffect(() => {
    (async () => {
      itemListLoader.current.setCategory(categoryId);
      setItemList(await itemListLoader.current.getMore());
    })();
  }, [categoryId]);

  return (
    <Container>
      <Header />
      <Intro />
      <ItemFilter
        setCategoryId={setCategoryId}
        categoryId={categoryId}
        categoryRef={categoryIdRef}
      />
      <ItemList itemList={itemList} />
      {/* {isLoading && <div>Loading...</div>} */}
      {!isFullLoaded && (
        <div ref={setRef}>
          <br />
        </div>
      )}
    </Container>
  );
}

export default App;
