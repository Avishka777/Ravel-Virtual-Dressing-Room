const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose
    .connect(process.env.MONGO_STRING)
    .then((data)=>{
        console.log(`Successfully connected to MongoDB`);
    })
    .catch((err)=>{
        console.log("Error occurred while connecting to MongoDB" + err.message);
        process.exit(1);
    })

}

module.exports = connectDatabase;