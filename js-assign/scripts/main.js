function showExaminedBook(requiredId, data) {
  bookProperties = ['bookId', 'price', 'genre'];
  const output = document.getElementById("list-examined-book");
  childElementList = output.childNodes;
  for(let i=1, j=0; i<6 && j<3; i+=2, j++){
    childElementList[i].childNodes[1].innerHTML = data[requiredId][bookProperties[j]];
  }
}

function populateSimilarBookTable(propertyObj, data) {
  similarBookTable = document.getElementById("table-similar-books");
  let [key] = Object.keys(propertyObj);
  let value = propertyObj[key];
  console.log(key, value);
  let table;
  for (item of data) {
    if (item[key] == value) {
      console.log();
      table += `<tr>
            <td>${item.bookId}</td>
            <td>${item.genre}</td>
            <td>${item.price}</td>
            <td>N/A</td>
        </tr>`;
    }
  }
  similarBookTable.innerHTML = table;
}

function populateAllBooksTable() {
  fetch("scripts/bookList.json")
    .then((response) => response.json())
    .then((data) => {
      allBookTable = document.getElementById("table-all-books");
      for (item of data) {
        console.log(item);
        allBookTable.innerHTML += `<tr>
            <td>${item.bookId}</td>
            <td>${item.genre}</td>
            <td>${item.price}</td>
            <td>N/A</td>
        </tr>`;
      }
    })
    .catch((error) => console.log(error));
}

function searchById(id) {
  fetch("scripts/bookList.json")
    .then((response) => response.json())
    .then((data) => {
      showExaminedBook(id, data);
    })
    .catch((error) => console.log(error));
}

function searchByGenre(genre) {
  fetch("scripts/bookList.json")
    .then((response) => response.json())
    .then((data) => {
      let requiredId = 0;
      for (let i = 0; i < 100; i++) {
        if (data[i].genre === genre) {
          requiredId = i;
          break;
        }
      }
      showExaminedBook(requiredId, data);
      populateSimilarBookTable({ genre: genre }, data);
    })
    .catch((error) => console.log(error));
}

function searchByPrice(price) {
  fetch("scripts/bookList.json")
    .then((response) => response.json())
    .then((data) => {
      let requiredId = 0;
      for (let i = 0; i < 100; i++) {
        if (data[i].price == price) {
          requiredId = i;
          break;
        }
      }
      showExaminedBook(requiredId, data);
      populateSimilarBookTable({ price: price }, data);
    })
    .catch((error) => console.log(error));
}

populateAllBooksTable();

const idButton = document.getElementById("btn-search-id");
idButton.addEventListener("click", (event) => {
  event.preventDefault();
  let id = document.getElementById("input-search-id").value;
  console.log(id);
  searchById(id);
});

const genreButton = document.getElementById("btn-search-genre");
genreButton.addEventListener("click", (event) => {
  event.preventDefault();
  let genre = document.getElementById("input-search-genre").value;
  console.log(genre);
  genre = genre.toLowerCase();
  searchByGenre(genre);
});

const priceButton = document.getElementById("btn-search-price");
priceButton.addEventListener("click", (event) => {
  event.preventDefault();
  let price = document.getElementById("input-search-price").value;
  console.log(price);
  searchByPrice(price);
});
// idButton = document.getElementById("btn-search-id");
// idButton.addEventListener("click", ()=>{

// })
