const setupButton = document.querySelector('#setUpFilter');
const questionButton = document.querySelector('#questionFilter');
const productsButton = document.querySelector('#productsFilter');

setupButton.addEventListener('click', () => querySearch('Setups'));
questionButton.addEventListener('click', () => querySearch('Questions'));
productsButton.addEventListener('click', () => querySearch('Products'));

function querySearch(query) {
    window.location.href = `search?query=${query}`;
  }