const express = require('express')
const cors = require('cors');
const app = express()
const morgan = require('morgan');
const dotenv = require('dotenv')
const connectDB = require('./config/db');

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use("/api/v1/test",require('./routes/testroutes'));
app.use("/api/v1/admin",require('./routes/admin'));
app.use("/api/v1/adminedit",require('./routes/adminedit'));
app.use("/api/v1/resturant",require('./routes/createnewresturantroutes'));


app.get('/',(req,res)=>{
    return res.status(200).send("<h1>wellcome</h1>");
});


const port = process.env.port || 8080;
app.listen(port,()=>{
    console.log("server is rum",port);
    
});
