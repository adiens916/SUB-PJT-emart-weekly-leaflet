import { useEffect, useState } from 'react';
import { Container } from '@mui/material';

import Intro from './components/Intro';
import Header from './components/Header';
import ItemFilter from './components/ItemFilter';
import ItemList from './components/ItemList';

import useItemLoader from './hook/useItemLoader';

function App() {
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const { items, loading, hasMore } = useItemLoader(page, categoryId);

  const changeCategory = (newCategoryId: number) => {
    setCategoryId(newCategoryId);
    setPage(1);
  };

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
      <ItemFilter categoryId={categoryId} changeCategory={changeCategory} />
      <ItemList itemList={items} />
      {loading && <div>Loading...</div>}
    </Container>
  );
}

export default App;
