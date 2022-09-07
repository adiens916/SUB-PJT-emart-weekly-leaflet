import { useEffect, useRef, useState } from 'react';
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

  const observer = useRef<IntersectionObserver>();
  const onRefAttachObserver = (node: HTMLDivElement) => {
    // 최초 마운트 시에는 로딩 상태이므로 관측 대상 설정하지 않음
    if (loading) return;
    // 이전에 관찰하던 대상들 관찰 해제
    if (observer.current) observer.current.disconnect();
    // 관찰자를 새로 만들어줘야 함 (새로 안 만들면 이전 행동 반복함)
    observer.current = new IntersectionObserver(onIntersect);
    // 새로 렌더링된 DOM을 관측 대상으로 설정
    if (node) observer.current.observe(node);
  };

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    // 이전 API 요청 결과가 더 있었을 때만, 페이지 개수 변경
    if (entry.isIntersecting && hasMore) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    console.log('items: ', items);
    console.log('loading: ', loading);
    console.log('hasMore: ', hasMore);
  }, [items, loading, hasMore]);

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
