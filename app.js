
// Module Import
const express = require('express');
const expresslayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const db = require('./db')
const app = express();


// Port Initiate
const port = 3000;



// Middleware & View Engine
app.set("view engine", "ejs");
app.use(expresslayouts);
app.use(express.static("Public"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
// app.use(express.json());
app.use(express.urlencoded());





// Module & Routing
app.get('/',async(req,res)=>{
  const importProducts = await db("products").select('*').orderBy('nama_produk','asc').limit(5);
  const productRaw = JSON.stringify(importProducts);
  const products = JSON.parse(productRaw);
    res.render('index',{
      title : 'Best Home Furniture in Town',
      layout : 'layouts/main-layout',
      products
    })
})

app.get('/products',async(req,res)=>{
  const importProducts = await db("products").select('*').orderBy('nama_produk','asc');
  const productRaw = JSON.stringify(importProducts);
  const products = JSON.parse(productRaw);
    res.render('products',{
      title : 'Best Home Furniture in Town',
      layout : 'layouts/main-layout',
      products
    })
})

app.get('/product-register',async(req,res)=>{
  const importProducts = await db("products").select('*').orderBy('nama_produk','asc')
  const productRaw = JSON.stringify(importProducts);
  const products = JSON.parse(productRaw);
  res.render('product-register',{
    title : 'Products Edit',
    layout : 'layouts/main-layout',
    products,
  })
})
app.get('/product=:id',async(req,res)=>{
  const importProducts = await db("products").select('*').where('id',req.params.id).first()
  const productRaw = JSON.stringify(importProducts);
  const products = JSON.parse(productRaw);
  res.render('product-detail',{
    title : 'Products Edit',
    layout : 'layouts/main-layout',
    products,
  })
})










app.use('/',(req,res)=>{
  res.render('404',{
    title : 'Page Not Found',
    layout : 'layouts/main-layout'
  })
})


// App Listener
app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})