require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat');
const methodOverride = require('method-override');

app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));


main().then(()=>{
    console.log("connection successfully");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

//Index route
app.get("/chats", async (req, res) => {
  try {
    let chats = await Chat.find();
    res.render("index", { chats });
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

//New route
app.get("/chats/new",(req,res)=>{
    res.render("new");
})

//Create route
app.post('/chats',(req,res)=>{
    let {from,msg,to} = req.body;
    let newChat = new Chat({
        from : from,
        msg : msg,
        to : to,
        created_at : new Date(),
    });
    newChat.save().then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats")
})

//Edit route
app.get('/chats/:id/edit', async (req,res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", {chat});
});

//Update route
app.put('/chats/:id', async (req,res) => {
  let { id } = req.params;
  let {msg : newMsg} = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    {msg : newMsg},
    { runValidators : true, returnDocument: "after"}
  );
  res.redirect("/chats");
});

//Delete route
app.delete('/chats/:id', async (req,res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
    res.redirect("/chats");
});

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})