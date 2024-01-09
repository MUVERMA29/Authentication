const express = require("express");
const cors = require("cors");
const app = express();
require("./DB/conn");
require("./models/userSchema");
const router = require("./routes/routers");
const cookieParser = require("cookie-parser");

const PORT = 8080;

// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });
app.use(express.json());
app.use(router);
app.use(cors());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`server is running on port number ${PORT}`);
});
