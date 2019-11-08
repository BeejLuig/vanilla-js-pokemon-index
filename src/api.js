class API {
  constructor(state) {
    this.state = state;
  }
  getPokemon(url = 'https://pokeapi.co/api/v2/pokemon/') {
    const { state } = this;
    return state.cache[url]
      ? Promise.resolve(state.cache[url])
        // .then(setState)
        // .then(dispatchRender)
      : fetch(url, { headers: { accept: 'application/json' } })
        .then(res => res.json())
        .then(data => {
          state.cache[url] = data;
          return data;
          // setState(data)
        })
        // .then(dispatchRender)
        .catch(console.error);
  }
}
export default API;