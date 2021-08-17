const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ContactSchema=new Schema({
    formName:{
        type:String,
        required:true
    },
    formEmail:{
        type:String,
        required:true
    },
    formNumber:{
        type:Number,
        required:true
    },
    formText:{
        type:String,
        required:false
    },
});

module.exports=ContactForm=mongoose.model('contact forms', ContactSchema);