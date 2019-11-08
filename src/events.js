export const onRender = callback => {
  document.addEventListener('render', callback);
}

export const onLoad = callback => {
  window.addEventListener('DOMContentLoaded', callback)
}

export const dispatchRender = detail =>
  document.dispatchEvent(new CustomEvent('render', { detail, bubbles: true }))