const express = require('express')
const cors = require('cors');
const app = express();
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv')
const connectDB = require('./config/db');

dotenv.config();

connectDB();

app.use(cors({
    origin: [
        'http://localhost:3000' // Live frontend URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust methods as needed
    credentials: true // If cookies or authentication tokens are used
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/v1/test",require('./routes/testroutes'));
app.use("/api/v1/admin",require('./routes/admin'));
app.use("/api/v1/adminedit",require('./routes/adminedit'));
app.use("/api/v1/resturant",require('./routes/createnewresturantroutes'));
app.use("/api/v1/manageorder", require('./routes/manageOrder'));
app.use('/api/v1/category', require('./routes/categoryRoutes'));
app.use('/api/v1/user', require('./routes/CustomerRoutes'));
app.use('/api/v1/addCart' , require('./routes/orderRoute'));
app.use('/api/v1/order' , require('./routes/placedOrder'));
app.use('/api/v1/qrCode', require('./routes/qrCodeRoute'));


app.get('/',(req,res)=>{
    return res.status(200).send("<h1>wellcome</h1>");
});


const port = process.env.port || 8080;
app.listen(port,()=>{
    console.log("server is run",port);
});
