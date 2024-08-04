const mongoose = require('mongoose');
require("dotenv").config();

module.exports = async() =>{
    const mongoUri = process.env.MONGODB_URL;
    try{
    const connect = await mongoose.connect(mongoUri);
      console.log(`mongoDb connected`);
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}; 