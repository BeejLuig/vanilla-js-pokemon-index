export const removeChildren = target => {
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
}