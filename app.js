const express = require('express');
const path = require("path");
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views')); // setting up ejs and our views folder
app.set('view engine', 'ejs');
const server = app.listen(1337);
const io = require("socket.io")(server);


app.get('/', function(req, res) { // root route to render the index.ejs view
res.render("index.ejs");
})

var start_color;

io.on('connection', function(socket){ //2 This triggers our server's connection listener to run, and this occurs for every new socket connection. 
    socket.emit("first_background", start_color);    

    socket.on("new_color", function(data) { //3 
        io.emit("new_background",data);
        console.log(data);
        start_color = data;
    }) 

    // io.emit("countbtn",{btncount:count});

    // socket.on("resetbtn", function() { //3 
    //     count = 0;
    //     let zerocount = count;
    //     io.emit("resetbtn",{zerocount:count});
    //     console.log(zerocount)
    // }) 
    // io.emit("resetbtn",{zerocount:count});

}); 