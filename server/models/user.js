import mongoose from "mongoose";
const userSchema=  mongoose.Schema({
    _id:{type:String,reqired:true},
     username:{type:String,reqired:true},
     email:{type:String,reqired:true},
     image:{type:String,reqired:true},
     role:{type:String,enum:["user","hotelOwner"],default:"user"},
     recentSearchedCities:[{type:String,reqired:true}],
}, {timestamps: true});
const User=mongoose.model("User",userSchema);

export default User;