const mongoose = require('mongoose');

const InstitutionSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  code:    { type: String, required: true, unique: true, uppercase: true },
  address: String,
  city:    String,
  state:   String,
  phone:   String,
  email:   String,
}, { timestamps: true });

module.exports = mongoose.model('Institution', InstitutionSchema);