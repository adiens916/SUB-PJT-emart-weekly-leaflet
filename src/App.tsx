import { useEffect, useRef, useState } from 'react';
import { Container } from '@mui/material';

import Intro from './components/Intro';
import Header from './components/Header';
import ItemFilter from './components/ItemFilter';
import ItemList from './components/ItemList';

import useItemLoader from './hook/useItemLoader';

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const categoryIdRef = useRef<number>(0);

  const [page, setPage] = useState(1);
  const { items, loading, hasMore } = useItemLoader(page, 0);
  useEffect(() => {
    console.log('items: ', items);
    console.log('loading: ', loading);
    console.log('hasMore: ', hasMore);
  }, [items, loading, hasMore]);

  return (
    <Container>
      <button
        onClick={() => {
          setPage((page) => page + 1);
        }}
      >
        아이템 로딩
      </button>
      <Header />
      <Intro />
      <ItemFilter
        setCategoryId={setCategoryId}
        categoryId={categoryId}
        categoryRef={categoryIdRef}
      />
      <ItemList itemList={items} />
      {loading && <div>Loading...</div>}
    </Container>
  );
}

export default App;
