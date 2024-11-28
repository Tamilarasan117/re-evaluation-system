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
  department: {
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
    min: 0,
    max: 100,
  },
  fees: {
    type: Number,
    required: true,
    min: 350,
    max: 1000,
  },
  revaluatedMark: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
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
    minlength: 10, // Minimum 10 characters for a valid reason
  },
  status: {
    type: String,
    enum: ['Pending', 'InReview', 'Completed', 'Approved', 'Rejected'],
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
