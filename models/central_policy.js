import mongoose from "mongoose";

// Defining Schema
const central_policy = new mongoose.Schema({
  policy_name: { type: String, required: true, trim: true },
  date_added: { type: String, required: true, trim: true },
  policy_category: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  occupassion: { type: String, required: true, trim: true },
  qualification: { type: String, required: true, trim: true },
  income: { type: String, required: true, trim: true },
  caste: { type: String, required: true, trim: true },
  age: { type: String, required: true, trim: true },

  details: { type: String, required: true, trim: true },
  policy_link: { type: String, required: true, trim: true }


})
// Model
const central_policyModel = mongoose.model("central_policies", central_policy)
export default central_policyModel