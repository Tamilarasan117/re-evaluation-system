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
  transactionId: {
    type: String,
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
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  subject: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
})

// export the model
export const Payment = mongoose.model('Payment', PaymentSchema)
