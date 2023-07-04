import mongoose from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
  person_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  person_password: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  last_active: { type: String, required: true, trim: true },
  occupassion: { type: String, required: true, trim: true },
  qualification: { type: String, required: true, trim: true },
  income: { type: String, required: true, trim: true },
  caste: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  age: { type: String, required: true, trim: true },


})

// Model
const UserModel = mongoose.model("user", userSchema)

export default UserModel