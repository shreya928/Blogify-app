const mongoose = require("mongoose");
const initData = require("./data.js");
const blog = require("../models/blog.js");
main()
    .then(()=>{
        console.log("connection successful");
    })
    .catch((err)=>{
        console.log(err)
    });

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Blogify');
}
const initDB = async() =>{
    await blog.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:new mongoose.Types.ObjectId('692a9ad013396f378637ba1d')
    }));
    await blog.insertMany(initData.data);
    console.log("Data was initialized");
}
initDB();