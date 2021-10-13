const result_wrapper = document.querySelector('.result-wrapper');
const pagination_wrapper = document.querySelector('.pagination-wrapper');
const previousButton = document.querySelector('.js-previous');
const nextButton = document.querySelector('.js-next');
const current_page = document.querySelector('.js-page'); 

let currentPage = 1;
let rows = 5;
let more = true;

function displayResults(hasMore, users) {
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

async function getUsers(current_page, limit_rows) {
  const response = await fetch(`http://localhost:3001/api/users?page=${current_page}&limit=${limit_rows}`);
  const {hasMore, results} = await response.json();
  more = hasMore;
  displayResults(hasMore, results);
};

getUsers(currentPage, rows);


nextButton.addEventListener('click', function() {
  if (more) {
    currentPage++;
    getUsers(currentPage, rows);
  }
});

previousButton.addEventListener('click', function() {
  if (currentPage !== 1) {
    currentPage--;
    getUsers(currentPage, rows);
  }
})




