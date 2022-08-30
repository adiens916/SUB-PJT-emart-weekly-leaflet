import { useCallback, useEffect, useRef, useState } from 'react';

// import NavigationBar from './components/NavigationBar';
// import Intro from './components/Intro';
import ItemFilter from './components/ItemFilter';
import ItemList from './components/ItemList';

import { useIntersectionObserver } from './hook/useIntersectionObserver';
import { getItemListByPage } from './api';
import { ItemType } from './types';
import './App.css';
import Intro from './components/Intro';
import Header from './components/Header';
import { Container } from '@mui/material';

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const categoryIdRef = useRef<number>(0);
  const pageCount = useRef<number>(1);

  const loadItemList = useCallback(async () => {
    setIsLoading(true);

    console.log('in func', categoryIdRef);

    const newItemList = await getItemListByPage(
      categoryIdRef.current,
      pageCount.current,
    );

    setItemList((itemList) => [...itemList, ...newItemList]);
    pageCount.current += 1;

    setIsLoading(false);
  }, [categoryIdRef.current]);

  const setObservationTarget = useIntersectionObserver(loadItemList);

  useEffect(() => {
    console.log(categoryIdRef);
    pageCount.current = 1;
    setItemList([]);
    loadItemList();
  }, [categoryIdRef.current]);

  return (
    <Container>
      <Header />
      <Intro />
      <ItemFilter
        setCategoryId={(id: number) => {
          setCategoryId(id);
        }}
        categoryRef={categoryIdRef}
      />
      <ItemList itemList={itemList} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && <div ref={setObservationTarget}></div>}
    </Container>
  );
}

export default App;
