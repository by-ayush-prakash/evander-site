// Progressive enhancement: native details remain usable without JavaScript.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const settleAll: Array<() => void> = [];

document.querySelectorAll<HTMLElement>('.cp-disclosures, .atlas-feature-list').forEach((list) => {
  const items = [...list.querySelectorAll<HTMLDetailsElement>('details')];
  const states = new Map<HTMLDetailsElement, { expanded: boolean; animation?: Animation; fade?: Animation }>();

  const settle = (item: HTMLDetailsElement) => {
    const state = states.get(item)!;
    state.animation?.cancel();
    state.fade?.cancel();
    state.animation = undefined;
    state.fade = undefined;
    item.open = state.expanded;
    item.style.removeProperty('overflow');
  };

  const expand = (item: HTMLDetailsElement, expanded: boolean) => {
    const summary = item.querySelector<HTMLElement>('summary')!;
    const answer = item.querySelector<HTMLElement>('.w-motion-answer')!;
    const state = states.get(item)!;
    const startHeight = item.getBoundingClientRect().height;
    const startOpacity = item.open ? Number(getComputedStyle(answer).opacity) : 0;
    state.animation?.cancel();
    state.fade?.cancel();
    state.expanded = expanded;
    item.dataset.expanded = String(expanded);
    if (reduceMotion.matches) { settle(item); return; }

    // Keep the answer rendered while it closes; measure from the current frame
    // so quick repeated clicks reverse smoothly instead of jumping.
    item.open = true;
    const style = getComputedStyle(item);
    const box = ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth']
      .reduce((total, key) => total + parseFloat(style[key as keyof CSSStyleDeclaration] as string || '0'), 0);
    const targetHeight = expanded ? item.getBoundingClientRect().height : summary.getBoundingClientRect().height + box;
    item.style.overflow = 'hidden';
    const animation = item.animate({ height: [`${startHeight}px`, `${targetHeight}px`] }, {
      duration: 300, easing: 'cubic-bezier(.22,1,.36,1)',
    });
    state.animation = animation;
    state.fade = answer.animate({ opacity: [startOpacity, expanded ? 1 : 0] }, {
      duration: expanded ? 240 : 180, easing: 'ease-out', fill: 'both',
    });
    animation.onfinish = () => { if (state.animation === animation) settle(item); };
  };

  items.forEach((item) => {
    const summary = item.querySelector<HTMLElement>('summary');
    if (!summary) return;
    const answer = document.createElement('div');
    answer.className = 'w-motion-answer';
    [...item.childNodes].filter(node => node !== summary).forEach(node => answer.append(node));
    item.append(answer);
    item.removeAttribute('name'); // Manage exclusivity so both panels can animate.
    states.set(item, { expanded: item.open });
    item.dataset.expanded = String(item.open);
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      const expanded = !states.get(item)!.expanded;
      if (expanded) items.forEach(other => { if (other !== item && states.get(other)?.expanded) expand(other, false); });
      expand(item, expanded);
    });
    item.addEventListener('toggle', () => {
      const state = states.get(item)!;
      if (!state.animation) { state.expanded = item.open; item.dataset.expanded = String(item.open); }
    });
  });
  settleAll.push(() => items.forEach(settle));
});
reduceMotion.addEventListener('change', () => settleAll.forEach(settle => settle()));
window.addEventListener('resize', () => settleAll.forEach(settle => settle()));
