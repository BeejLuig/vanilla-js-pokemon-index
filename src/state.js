/**
 * cache: object
 * firstPokeId: number
 * lastId: number
 * count: number
 * next: null or string
 * previous: null or string
 * results: array
 */
export default (state = { cache: {} }) => {
  const setState = newState => {
    if (typeof newState === 'function') {
      return newState(state);
    }
    state = { ...state, ...newState };
    return;
  }
  return [state, setState]
};
