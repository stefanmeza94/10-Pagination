const result_wrapper = document.querySelector('.result-wrapper');
const pagination_wrapper = document.querySelector('.pagination-wrapper');
const previousButton = document.querySelector('.js-previous');
const nextButton = document.querySelector('.js-next');
const current_page = document.querySelector('.js-page'); 

console.log(window.location)

let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
let currentPage = urlParams.get('page') ?? 1;
let userRows = urlParams.get('limit') ?? 5;

let more = true;

function updateLocationSearch() {
  location.search = `?page=${currentPage}&limit=${userRows}}`;
}

let url = `http://localhost:3001/api/users?page=${currentPage}&limit=${userRows}`;

// DISPLAY USERS
function displayResults(users) {
  result_wrapper.innerHTML = '';

  users.forEach(u => {
    const html = `<div class="user">
                    <h3>${u.name}</h3>
                    <ul>
                      <li>Id: ${u.id}</li>
                      <li>Email: ${u.email}</li>
                      <li>Address: ${u.address}</li>
                      <li>Country: ${u.country}</li>
                      <li>Company: ${u.company}</li>
                    </ul>
                  </div>`;

    result_wrapper.insertAdjacentHTML('beforeend', html);
  });
};

// GET USERS
async function getUsers(url) {
  try {
    const response = await fetch(url);
    const {hasMore, results} = await response.json();

    more = hasMore;
    displayResults(results);
  } catch (error) {
    console.log(error);
  }
};


// NEXT BUTTON
nextButton.addEventListener('click', function() {
  if (more) {
    currentPage++;
    updateLocationSearch();
    getUsers(url);
  }
});

// PREVIOUS BUTTON
previousButton.addEventListener('click', function() {
  if (currentPage != 1) {
    currentPage--;
    updateLocationSearch();
    getUsers(url);
  } 
});


getUsers(url);