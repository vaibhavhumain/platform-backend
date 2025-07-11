const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>{
    console.log("error",err);
})

module.exports = mongoose;
