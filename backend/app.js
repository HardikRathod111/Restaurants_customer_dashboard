// require('dotenv').config();
const  express = require('express')
const path = require('path');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser'); 
const connectDB = require('./db'); 
const session = require('express-session');
const restaurantRoutes = require('./routes/restaurantRoutes')
const port = 8001;
const app = express()
connectDB();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(restaurantRoutes);


app.listen(port,(err)=>{
    if(err)
    {
        console.log('someting is worng');
    }
    console.log('server is runming');
});
