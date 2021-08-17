const mongoose= require('mongoose');

// const mongoURI= "mongodb+srv://admin:Admin123@testing.y9m9u.mongodb.net/devs?retryWrites=true&w=majority";

var connectDB= async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log('MongoDB connected');
    }
    catch(err){
        console.log('Error: '+ err);
    }
}

module.exports= connectDB;