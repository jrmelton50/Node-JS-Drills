const rp = require("request-promise");
const path = require("path");
const fs = require("fs");
let dataPath = path.join(__dirname, "./popular-articles.json");
let array = [];

rp("https://reddit.com/r/popular.json")
    .then( (res) => {
        JSON.parse(res).data.children.forEach( (item) => {
            let post = {
                title: item.data.title,
                url: item.data.url,
                author: item.data.author
            }
            array.push(post);
        });
        fs.writeFile(dataPath, JSON.stringify(array));
    })
    .catch( (err) => {
        console.log(err);
    });