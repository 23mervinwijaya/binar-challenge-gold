
// Module Import
const express = require('express');
const expresslayouts = require("express-ejs-layouts");
const morgan = require("morgan");

const app = express();


// Port Initiate
const port = 3000;



// Middleware & View Engine
app.set("view engine", "ejs");
// app.use(expresslayouts);
app.use(express.static("Public"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
// app.use(express.json());
app.use(express.urlencoded());





// Module & Routing
app.get('/',(req,res)=>{
    res.render('index')
})



















// App Listener
app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})