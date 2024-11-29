// import require packages
import mongoose from "mongoose"

const RevaluationRequestSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  studentTokenNo: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  semester: {
    type: Number,
    required: true,
    trim: true,
    min: 1,
    max: 6,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  mark: {
    type: Number,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  revaluatedMark: {
    type: Number,
  },
  document: {
    type: String,
    required: true,
    trim: true,
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'InProgress', 'Completed', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    default: 'Unpaid',
  },
  evaluatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  comment: {
    type: String,
    default: '',
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

// export the model
export const RevaluationRequest = mongoose.model('RevaluationRequest', RevaluationRequestSchema)
