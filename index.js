const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const API = require("./apiRouter")
const AUTH = require("./authRouter")
const { response } = require("express")

const app = express();


const port = process.env.PORT | 3000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use(cors())
app.use("/api", API)
app.use("/auth", AUTH, (req, res)=>{console.log("response came")})
const connectionString = "mongodb+srv://vedik:gPeGHXlbm0GHmI87@cluster0.m01by.mongodb.net/VedikSite?retryWrites=true&w=majority";
//const connectionString = "mongodb://vediksite:4vdVaj7nddYNG3iGDg0iQc7aTvDuSx2LsjQ1oeGZ9Nx0253Hdb9vYcEEAX8erSRLcBfpmVhq04IFhqqy20iwBQ==@vediksite.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&connect=direct&appName=@vediksite@";
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected")).catch((err) => console.log(err))
app.listen(port, ()=>console.log("Listening On Port", port))


// const insertMember = async (name, password) => {
//     const member = Member({
//         name: name,
//         password: md5(password)
//     })
//     console.log(member)
//     const result = await member.save()
//     console.log(result)
// }