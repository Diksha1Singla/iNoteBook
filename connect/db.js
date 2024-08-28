const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/inotebookServer")
.then(()=>{console.log("Connection Successful");})
.catch(()=>{console.log("Connection Failed");})