import { useEffect, useState } from 'react';
import { fetchItems } from '../api';
import { ItemType } from '../types';

export default function useItemLoader(page: number, category: number) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  // 카테고리가 바뀔 때만 목록 초기화
  useEffect(() => {
    setItems([]);
  }, [category]);

  // 페이지가 바뀔 때만 목록 증가
  useEffect(() => {
    setLoading(true);

    fetchItems(page, category)
      .then((newItems) => {
        if (newItems.length > 0) {
          // 그냥 계속해서 증가시키는 방식 - 중복 가능성 있으므로 비추천
          setItems((items) => [...items, ...newItems]);

          // Set을 이용해 중복을 제거하는 방식
          // const itemList = Array.from(new Set([...items, ...newItems]));
          // setItems(itemList);

          setHasMore(true);
        } else {
          setHasMore(false);
        }

        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page, category]);

  return { items, loading, hasMore };
}
