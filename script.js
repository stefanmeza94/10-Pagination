const result_wrapper = document.querySelector('.result-wrapper');
const pagination_wrapper = document.querySelector('.pagination-wrapper');
const previousButton = document.querySelector('.js-previous');
const nextButton = document.querySelector('.js-next');

let currentPage = 1;
let rows = 5;

function displayPage(data) {
  result_wrapper.innerHTML = '';

  data.forEach(u => {
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
  const {results} = await response.json();
  // console.log(results);
  displayPage(results);
};

previousButton.addEventListener('click', function(e) {
  if (currentPage === 1) {
    return;
  }
  currentPage--;
  getUsers(currentPage, rows);
});

nextButton.addEventListener('click', function(e) {
  currentPage++;
  getUsers(currentPage, rows);
});

getUsers(currentPage, rows);

// document.addEventListener('load', getUsers(currentPage, 10));






