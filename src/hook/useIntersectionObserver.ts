/**
 * 출처: https://velog.io/@yunsungyang-omc/React-무한-스크롤-기능-구현하기-used-by-Intersection-Observer-2
 */

import { useCallback, useEffect, useState } from 'react';

const defaultOption: IntersectionObserverInit = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};

const useIntersect = (
  onIntersect: onIntersectType,
  option: IntersectionObserverInit,
) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const checkIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer);
      }
    },
    [],
  );

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...defaultOption,
        ...option,
      });
      observer.observe(ref);
    }

    return () => observer && observer.disconnect();
  }, [ref, checkIntersect]);

  return { ref, setRef };
};

export default useIntersect;

interface onIntersectType {
  (entry: IntersectionObserverEntry, observer: IntersectionObserver): void;
}
