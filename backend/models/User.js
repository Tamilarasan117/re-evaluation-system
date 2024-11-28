// import require packages
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v); // Regex for email validation
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'evaluator'],
    default: 'student',
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  dob: {
    type: String,
  },
  tokenNo: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Regex for phone number validation
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  bio : {
    type: String,
    trim: true,
    default: "This is a default bio",
  },
  profile : {
    type: String,
    trim: true,
  },
  department: {
    type: String,
    trim: true,
  },
  course: {
    type: String,
    trim: true,
  },
  sem: {
    type: Number,
    min: 1,
    max: 6,
    default: 1,
  },
  address: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
}, {
  timestamps: true,
})

// export the model
export const User = mongoose.model('User', UserSchema)
