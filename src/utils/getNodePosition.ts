const getNodePosition = (
  node: HTMLElement
): {
  top: number;
  left: number;
  width: number;
  height: number;
  margin: string | null;
  padding: string | null;
  borderRadius: string | null;
} => {
  const rect = node.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(node);
  const marginTop = !computedStyle.marginTop ? 0 : parseInt(computedStyle.marginTop, 10);
  const marginLeft = !computedStyle.marginLeft ? 0 : parseInt(computedStyle.marginLeft, 10);

  return {
    top: rect.top - marginTop + (window.pageYOffset || document.documentElement.scrollTop),
    left: rect.left - marginLeft,
    width: rect.width,
    height: rect.height,
    margin: computedStyle.margin,
    padding: computedStyle.padding,
    borderRadius: computedStyle.borderRadius,
  };
};

export default getNodePosition;
