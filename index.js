const express = require("express")
const app = express();
const port = process.env.port||3000;
require("./connect/db");
const routerAuth = require("./routes/auth_route")
// const noteRoute = require("./routes/note_route")

app.use(express.json());

app.use("/api/auth",routerAuth)
// app.use("/api/notes",noteRoute)

app.listen(port,()=>{
    console.log("Listening to the port ",port);  
})