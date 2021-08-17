const express= require('express');
const app = express();
// require('dotenv').config();
const ejs=require('ejs');
const dotenv= require('dotenv');
const bodyParser= require('body-parser');
const connectDB= require('./config/db');


dotenv.config({path: '.env'});

connectDB();



app.use(express.static(__dirname + '/'));
// app.engine('ejs', require('ejs').renderFile);
app.set("view engine", "ejs"); 
// app.set("/", __dirname + "/assets"); 
app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// var urlencodedParser=bodyParser.urlencoded({extended:false});

app.use('/',require('./routes/index'));

let port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Server is started");
});
