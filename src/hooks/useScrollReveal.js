import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // 找到所有还没显示的 .reveal 元素并观察
    const observeAll = () => {
      const children = el.querySelectorAll('.reveal:not(.visible)');
      children.forEach((c) => obs.observe(c));
    };

    // 立即观察当前已有的元素
    observeAll();

    // 监听 DOM 变化 — 当加载完成后新元素插入时自动观察
    const mutationObs = new MutationObserver(observeAll);
    mutationObs.observe(el, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mutationObs.disconnect();
    };
  }, []);

  return ref;
}