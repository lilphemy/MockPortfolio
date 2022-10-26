let server = require("http");
let path = require("path");
let file = require("fs");
const { extname } = require("path");


let mainServer = server.createServer((req, res) => {
    let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
    let contType = typeOfCont(filePath) || "text/html";
    let emptyPage = path.join(__dirname, "public", "404page.html");
    file.readFile(filePath, "utf-8", (err, cont) => {
        if(err){
            if(err.code === "ENDENT"){
                fs.readFile(emptyPage, "utf-8", (err, cont) => {
                    res.writeHead(200, {"Content-Type":contType})
                    res.end(cont)
                })
            }else{
                res.writeHead(500);
                res.end("hell of an error has occured!")
            }
        }else{
            res.writeHead(200, {"Content-Type":contType})
            res.end(cont)
        }
    })
})

let typeOfCont = (filepath) => {
    let extNamer = path.extname(filepath);
    if(extNamer === ".js"){
        return "text/javascript";
    }else if (extNamer === ".css") {
        return "text/css";
    }else if (extNamer === ".json"){
        return "application/JSON"
    }else if(extNamer === ".png"){
        return "image/png"
    }else if(extNamer === ".jpg"){
        return "image/jpg"
    }
}

mainServer.listen(1200, () => console.log("server is running on port 1200"))