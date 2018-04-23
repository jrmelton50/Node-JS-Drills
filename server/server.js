const path = require("path");
const fs = require("fs");

let chirp1 = {
    author: "Jessie",
    message: "chirp 1"
}

let chirp2 = {
    author: "Josh",
    message: "chirp 2"
}

let chirp3 = {
    author: "Kaitlyn",
    message: "chirp 3"
}

let chirp4 = {
    author: "Alex",
    message: "chirp 4"
}

let chirp5 = {
    author: "Allison",
    message: "chirp 5"
}

let array = [chirp1, chirp2, chirp3, chirp4, chirp5];
let dataPath = path.join(__dirname, "../chirps.json");

fs.writeFile(dataPath, JSON.stringify(array));

fs.readFile(dataPath, {
    encoding: "UTF-8"
}, (err, data) => {
    let chirp = JSON.parse(data);
    console.log(chirp.author);
    console.log(chirp.message);
}); 