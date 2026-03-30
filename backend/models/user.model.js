const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,

    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      required: [true, 'Please add an email'],
      enum:["Admin","Admission Officer","Management"],
      default:"Admission Officer"
    }
  },
  {
    timestamps: true,
  }
)


UserSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)})

UserSchema.methods.comparePassword = function(plainPassword){
  return bcrypt.compare(plainPassword,this.password)
}


module.exports = mongoose.model('User', UserSchema)