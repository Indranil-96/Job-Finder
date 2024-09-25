const express =require('express');
// importing environment variable.
const dotENv=require('dotenv');

const Path =require('path');
// import { name } from 'ejs';


const collection=require('./models/mongoDB');
const scollection = require('./models/mongoDB');

//configurng dotenv file.
dotENv.config();


//rest object
const app=express();

// View Engine
app.set('view engine','ejs');
app.set('views',Path.join(__dirname,'views'));


// Bootstrap access
app.use('/css',express.static(Path.join('node_modules','bootstrap','dist','css')));
app.use('/js',express.static(Path.join('node_modules','bootstrap','dist','js')));

// Static files
app.use(express.static(Path.join(__dirname,'assets')));


// Middleware
app.use(express.urlencoded()); // This middleware is important to receive data from ejs pages.




//Routes Home

app.get('/',(req,res)=>{
    res.render('home');
});


// Routes login
app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login',async(req,res)=>{
    try {
        const check=scollection.findOne({Email: req.body.Email});
    if(check.Password==req.body.Password){
        res.redirect('/');
    }else{
        res.send('Invalid Email or Password');
    }
    } catch (err) {
        console.log(err);
    }
});

//Routes signup
app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.post('/signup',async(req,res)=>{

    const data=req.body.Name;
    const user={
        name: req.body.Name,
        email: req.body.Email,
        phone: req.body.Phone,
        password: req.body.Password
    }
    console.log(user);

    try {
        await collection.insertMany([user]);
        console.log('Registered Successfully');
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.redirect('signup');
    }
});

//Routes employeer

app.get('/employeer',async(req,res)=>{
    res.render('employeer');
});

// extracting environment variables

const Port=process.env.port  || 8080; // if env file is not available then it will run on 8080 port.


// Listning to port.
app.listen(Port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server is on ${process.env.Dev_Mode} mode to port:${Port}`);
    }
})