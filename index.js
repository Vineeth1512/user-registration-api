const express = require("express");
const mongoose =require("mongoose");
const cors =require("cors");
const userRouter =require("./routes/user.routes")
const app = express();
const portNo =3001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/user",userRouter);

app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"Welcome to User Registration"
    })
})

const MONGODB_URL ='mongodb+srv://dbUser:dbUserPassword@atlascluster.w6sb48g.mongodb.net/Users-data?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URL).then(()=>{
    console.log("MongoDB is connected");

    app.listen(portNo,()=>{
        console.log(`Server is running on ${portNo}`)
    })

}).catch((err)=>{
console.log(err);
})