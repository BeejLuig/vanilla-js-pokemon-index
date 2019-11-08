import createState from './state';
import API from './api';
import { dispatchRender, onRender, onLoad }from './events';
import { removeChildren } from './utils';
import {
  pokeCountEl,
  pokeListEl,
  pokeFirstLastEl, 
  paginationEl,
  navEl,
} from './domElements';
import {
  pokeCountTemplate,
  pokeFirstLastTemplate,
  pokeListTemplate,
  paginationTemplate,
  navTemplate
} from './templates';
/**
 * Format
 * cache: object
 * firstPokeId: number
 * lastId: number
 * count: number
 * next: null or string
 * previous: null or string
 * results: array
 */
let [state, setState] = createState();
let api = new API(state);

const updateState = newState => setState(state => {
  Object.assign(state, newState)
  if (newState.results) {
    state.results = newState.results.map(poke => ({
      ...poke,
      id: (poke.url.match(/\/pokemon\/(\d+)/) || [])[1]
    }))
    state.firstPokeId = state.results[0].id;
    state.lastPokeId = state.results[newState.results.length - 1].id;
  }
});
const loadPokemon = url => api.getPokemon(url)
  .then(updateState)
  .then(dispatchRender);

onRender(() => {
  // For debugging
  console.log('state:',state)
  // String templates
  pokeCountEl.innerHTML = pokeCountTemplate(state);
  pokeListEl.innerHTML = pokeListTemplate(state);
  pokeFirstLastEl.innerHTML = pokeFirstLastTemplate(state);

  // Node templates
  // *need to append child to preserve event listeners*
  removeChildren(paginationEl);
  removeChildren(navEl)

  paginationEl.appendChild(paginationTemplate(state, { 
    onClick: loadPokemon
  }));
  navEl.appendChild(navTemplate(state, {
    onClick: dispatchRender
  }))
});

onLoad(() => loadPokemon());