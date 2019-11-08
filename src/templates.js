export const pokeCountTemplate = ({ count }) => `<p>There are ${count} pokemon total!</p>`;
export const pokeFirstLastTemplate = ({ firstPokeId, lastPokeId }) => 
  `<p>Now viewing pokemon ${firstPokeId} through ${lastPokeId}.</p>`;
export const pokeListTemplate = ({ results }) => `
<ul class="poke-list">
${results.map(({ id, name }) => `<li class="poke-name">${id} - ${name}</li>`).join('')}
</ul>
`;
export const paginationTemplate = ({ previous, next }, { onClick }) => {
  const nav = document.createElement('nav');

  const prevBtn = document.createElement('button');
  const nextBtn = document.createElement('button');

  prevBtn.textContent = 'Previous';
  prevBtn.disabled = !previous;
  nextBtn.textContent = 'Next';
  nextBtn.disabled = !next;

  prevBtn.addEventListener('click', () => onClick(previous));
  nextBtn.addEventListener('click', () => onClick(next));

  nav.append(prevBtn, nextBtn);
  return nav;
}
export const navTemplate = ({ results }, { onClick }) => {
  const nav = document.createElement('nav');
  const sortByAlphaBtn = document.createElement('button');
  const sortByIdBtn = document.createElement('button');

  const sortAlphabetically = () => {
    results.sort((p1, p2) => {
      const name1 = p1.name.toUpperCase();
      const name2 = p2.name.toUpperCase();

      if (name1 > name2) return 1;
      if (name2 > name1) return -1;
      return 0;
    });
  }
  const sortById = () => {
    results.sort((p1, p2) => p1.id - p2.id);
  }
  sortByAlphaBtn.textContent = 'Sort alphabetically';
  sortByAlphaBtn.addEventListener('click', () => {
    sortAlphabetically()
    onClick()
  });

  sortByIdBtn.textContent = 'Sort by ID';
  sortByIdBtn.addEventListener('click', () => {
    sortById();
    onClick();
  });
  nav.append(sortByAlphaBtn, sortByIdBtn);
  return nav;
}