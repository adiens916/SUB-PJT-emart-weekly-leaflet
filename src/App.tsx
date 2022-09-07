import { useState } from 'react';
import { Container } from '@mui/material';

import Intro from './components/Intro';
import Header from './components/Header';
import ItemFilter from './components/ItemFilter';
import ItemList from './components/ItemList';

import useItemLoader from './hook/useItemLoader';
import useObserver from './hook/useObserver';

function App() {
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const { items, loading, hasMore } = useItemLoader(page, categoryId);

  const changeCategory = (newCategoryId: number) => {
    setCategoryId(newCategoryId);
    setPage(1);
  };

  // 관찰자 생성
  const { onRefAttachObserver } = useObserver(onIntersect, loading);

  // 관측 시 행동
  function onIntersect([entry]: IntersectionObserverEntry[]) {
    // 이전 API 요청 결과가 더 있었을 때만, 페이지 개수 변경
    if (entry.isIntersecting && hasMore) {
      setPage((page) => page + 1);
    }
  }

  return (
    <Container>
      <Header />
      <Intro />
      <ItemFilter categoryId={categoryId} changeCategory={changeCategory} />
      <ItemList itemList={items} />
      {loading && <div>Loading...</div>}
      {!loading && (
        <div ref={onRefAttachObserver}>
          {/* 관측할 때 빈 div는 관측되지 않으므로, br 태그를 추가 */}
          <br />
        </div>
      )}
    </Container>
  );
}

export default App;
