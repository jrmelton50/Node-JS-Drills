const rp = require("request-promise");
const imageDownload = require("image-downloader");
const path = require("path");

rp("https://reddit.com/r/popular.json")
    .then((res) => {
        JSON.parse(res).data.children.forEach((item) => {
            let mediaLink = item.data.url.toString();
            let ext = path.extname(mediaLink);
            // Also have to ignore '.gifv' files
            if (ext == ".jpg" || ext == ".png") { // || ext == ".gifv") {
                let fileName = item.data.id.toString() + ext;
                let filePath = path.join(__dirname, ("./downloads/" + fileName));
                const options = {
                    url: mediaLink,
                    dest: filePath
                }
                imageDownload.image(options)
                    .then(({ filename, image }) => {
                        console.log("File saved to ", filename);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

            // Note: URLs for videos don't have an extension so we were told to ignore 
            // those and only look for urls with the extention of ".jpg, .png, and .gifv"
            // The code below was used before the above instruction was stated.
            // if (item.data.preview) {
            //     if (item.data.preview.reddit_video_preview) {
            //         isGIF = item.data.preview.reddit_video_preview.is_gif;
            //         mediaLink = item.data.url.toString();
            //         // console.log("Gif mediaLink = ", mediaLink);
            //         // console.log("Gif extention = ", path.extname(mediaLink));
            //         // console.log("Gif fileName = ", item.data.id.toString() + path.extname(mediaLink));   
            //     }
            //     else {
            //         isImage = item.data.preview.enabled;
            //         isVideo = item.data.is_video;
            //         mediaLink = item.data.url.toString();
            //         // mediaLink = item.data.thumbnail;
            //         // console.log("image mediaLink = ", mediaLink);
            //         // console.log("image extention = ", path.extname(mediaLink));
            //         // console.log("image fileName = ", item.data.id.toString() + path.extname(mediaLink));    
            //     }
            // }
            // let ext = path.extname(mediaLink);
            // if (ext != "") {
            //     let fileName = item.data.id.toString() + ext;
            //     let filePath = path.join(__dirname, ("./downloads/" + fileName));
            //     const options = {
            //         url: mediaLink,
            //         dest: filePath 
            //     }
            //     // console.log("url = ", options.url);
            //     imageDownload.image(options)
            //     .then( ({filename, image}) => {
            //         console.log("File saved to ", filename);
            //     })
            //     .catch( (err) => {
            //         console.log(err);
            //     });
            // }
        });
    })
    .catch((err) => {
        console.log(err);
    });