const mongoose = require('mongoose');

mongoURI = "mongodb://localhost:27017/inotebook"

const connectMongo = () => {
    mongoose.connect(mongoURI)
       console.log("MongoDB connected sucessfully"); 
   
}

module.exports = connectMongo;