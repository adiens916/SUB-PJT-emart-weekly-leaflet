import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '@mui/material';

import Intro from './components/Intro';
import Header from './components/Header';
import ItemFilter from './components/ItemFilter';
import ItemList from './components/ItemList';

import useIntersect from './hook/useIntersectionObserver';
import { getItemListByPage } from './api';
import { ItemType } from './types';

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const categoryIdRef = useRef<number>(0);
  const pageCount = useRef<number>(1);

  const { setRef } = useIntersect(async (entry, observer) => {
    setIsLoading(true);
    observer.unobserve(entry.target);

    const newItemList = await getItemListByPage(
      categoryIdRef.current,
      pageCount.current,
    );

    setItemList((itemList) => [...itemList, ...newItemList]);
    pageCount.current += 1;

    setIsLoading(false);
    observer.observe(entry.target);
  }, {});

  useEffect(() => {
    console.log(categoryIdRef);
    pageCount.current = 1;
    setItemList([]);
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
      {!isLoading && <div ref={setRef}></div>}
    </Container>
  );
}

export default App;
