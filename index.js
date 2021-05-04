const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const schemas = require("./schemas")
const md5 = require("md5")
const connectionString = "mongodb://vediksite:bvNszPLnnofrskDBiZebVVsU8M7rKonhQa1eP2miK9HbjqVI1dxhqWcE5GqiiX0O1vILpRPmbjeS0d9vRNqw2A==@vediksite.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@vediksite@";
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected")).catch((err) => console.log(err))


const Member = mongoose.model("Member", schemas.memberSchema)


const insertMember = async (name, password)=>{
    const member = Member({name:name, password: md5(password)})
    console.log(member)
    const result = await member.save() 
    console.log(result)
}

