import gif from './gifApi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const deleteBtn = document.getElementById('delete-btn');

const getGifs = search => {
  gif.search(search).then(results => {
    let output = `<h2 class="small-text">Il y a ${results.length} gifs</h2><div class="card-columns">`;
    results.forEach(gif => {
      output += `
          <div class="card mb-2">
          <img class="card-img-top" src="${gif.url}" alt="Card image cap">
          <div class="card-body">
       <h5 class="small-text">${gif.title}</h5>
      </div>
    </div>
          `;
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });
}

if (window.location.search === '' && window.location.pathname === '/') {
  searchForm.addEventListener("submit", e => {
    const searchTerm = e.target[1].value
    getGifs(searchTerm)
    history.pushState(searchTerm, '', `?q=${searchTerm}`)
    e.preventDefault();
  })
} else {
  const searchTerm = window.location.search.split('=')[1];
  searchInput.value = searchTerm;
  deleteBtn.style.visibility = "visible"
  getGifs(searchTerm);
}

deleteBtn.addEventListener("click", e => {
  searchInput.value = ''
  deleteBtn.style.visibility = "hidden"
  history.pushState('', '', '')
})

searchInput.addEventListener("keydown", e => {
  deleteBtn.style.visibility = "visible"
})