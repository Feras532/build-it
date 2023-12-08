const mongoose = require('mongoose')
const bcrypt = require("bcrypt");


const PCConfigSchema = new mongoose.Schema({
  totalPrice: String,
  CPU: { brand: String, model: String, price: String },
  GPU: { brand: String, model: String, price: String },
  MotherBoard: { brand: String, model: String, price: String },
  Case: { brand: String, model: String, price: String },
  Rams: { brand: String, model: String, price: String },
  SSD: { brand: String, model: String, price: String },
  HDD: { brand: String, model: String, price: String },
  M2: { brand: String, model: String, price: String },
  PSU: { brand: String, model: String, price: String },
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pcConfig: {
    type: [PCConfigSchema],
    default: [] // Initialize pcConfig as an empty array
}
})


module.exports = mongoose.model("User", UserSchema);
