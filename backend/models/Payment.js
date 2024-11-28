// import require packages
import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  revaluationRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RevaluationRequest',
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Unpaid'],
    default: 'Pending',
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxLength: 50,
    lowercase: true,
  },
  cardNumber: {
    type: String,
    required: true,
    minLength: 12,
    maxLength: 12,
    pattern: /^[0-9]{16}$/,
  },
  cvc: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 3,
    pattern: /^[0-9]{3}$/,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  expireDate: {
    type: String,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true
})

// export the model
export const Payment = mongoose.model('Payment', PaymentSchema)
