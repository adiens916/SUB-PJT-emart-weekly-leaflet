import { useRef } from 'react';

export default function useObserver(
  onIntersect: onIntersectType,
  loading: boolean,
) {
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

  return { onRefAttachObserver };
}

interface onIntersectType {
  (entries: IntersectionObserverEntry[], observer?: IntersectionObserver): void;
}
