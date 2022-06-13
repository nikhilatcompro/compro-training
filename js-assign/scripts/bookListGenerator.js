const myBookList = []

const priceList=[100, 200, 150, 300, 500, 1000, 50, 159, 180];
const genreList = ['thriller', 'horror', 'romance', 'adventure', 'mystery', 'crime', 'political', 'biography', 'fairytale', 'forkids'];

for(let i=0;i<100;i++){
    let obj = {
        bookId: i,
        genre: genreList[Math.floor(Math.random()*genreList.length)],
        price: priceList[Math.floor(Math.random()*priceList.length)],
    }

    myBookList.push(obj);
}

const bookListJSON = JSON.stringify(myBookList);
// localStorage.setItem('bookListJSON', bookListJSON);
// const fs = require('fs');
// let bookData; 

// fs.readFile('test.txt', (err, data)=>{
//     if(err) throw err;
//     bookData = JSON.parse(data); 
// });

let fs = require('fs');
fs.writeFile("bookList.json", bookListJSON, function(err) {
    if (err) {
        console.log(err);
    }
});
