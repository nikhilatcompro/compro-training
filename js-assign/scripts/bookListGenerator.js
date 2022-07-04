function randomItem(list){
	return Math.floor(Math.random()*list.length);
}

const myBookList = [];
const priceList=[100, 200, 150, 300, 500, 1000, 50, 159, 180];
const genreList = ['thriller', 'horror', 'romance', 'adventure', 
'mystery', 'crime', 'political', 'biography', 'fairytale', 'forkids'];

for(let i=0; i<100; i++){
	let obj = {
		bookId: i,
		genre: genreList[randomItem(genreList)],
    price: priceList[randomItem(priceList)]
	}
	myBookList.push(obj);
}

const bookListJSON = JSON.stringify(myBookList);

let fs = require('fs');
fs.writeFile("bookList.json", bookListJSON, function(err) {
  if (err) { console.log(err); }
});

