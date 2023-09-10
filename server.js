require('dotenv').config();
const port= process.env.PORT ;
// const IP = process.env.IP_ADDRESS ;

const express=require('express');
const app = express();

const checkUser  = require('./BaghChal/BaghChal-Services/middleware/checkUser');
const auth =  require('./BaghChal/BaghChal-Services/routes/auth');

const path = require('path');
const views = path.join(__dirname,'./BaghChal/BaghChal-WebApp/views');
const phaser = path.join(__dirname, 'node_modules', 'phaser', 'dist');

app.use('/phaser', express.static(phaser));

// app.set("view engine", "ejs")

// serves the static files
app.use('/view', express.static(views));
app.use('',auth);

//serves the authentication
// app.use('/api/auth',auth)

// Serve Phaser library from the 'node_modules' directory
// app.use('/phaser', express.static(phaser));

// api that serves the authentication
// app.use('/api/auth',auth)

app.listen(port, ()=>{
    console.log(`Server started at ${port}`)
})

// maybe later when we actually keep a single server
// app.listen(port, IP, ()=>{
//     console.log(`Server started at ${IP}:${port}`)
// });
