const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const API = require("./apiRouter")
const AUTH = require("./authRouter")

const app = express();


const port = process.env.PORT | 3000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use(cors())
app.use("/api", API)
app.use("/auth", AUTH)
const connectionString = "mongodb://vediksite:bvNszPLnnofrskDBiZebVVsU8M7rKonhQa1eP2miK9HbjqVI1dxhqWcE5GqiiX0O1vILpRPmbjeS0d9vRNqw2A==@vediksite.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@vediksite@";
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