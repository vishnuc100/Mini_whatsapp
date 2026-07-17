const mongoose = require('mongoose');
const Chat = require('./models/chat');
main().then(()=>{
    console.log("connected to mongoDb");
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from : "Kuldeep",
        to : "Sumit",
        msg : "I will kill you",
        created_at : new Date(),
    },
    {
        from : "Pankaj",
        to : "Sahil",
        msg : "Where are you bro",
        created_at : new Date(),
    },
    {
        from : "Pooja",
        to : "Kajol",
        msg : "Please share me your javaScript notes",
        created_at : new Date(),
    },
    {
        from : "Payal",
        to : "Kusum",
        msg : "How are you",
        created_at : new Date(),
    }
]

Chat.insertMany(allChats).then((res)=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err)
})