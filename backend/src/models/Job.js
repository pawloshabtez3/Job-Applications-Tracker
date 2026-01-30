const mongoose = require('mongoose');

const STATUS_VALUES = ['Applied', 'Interview', 'Offer', 'Rejected'];

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: STATUS_VALUES,
      default: 'Applied'
    },
    applicationDate: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
module.exports.STATUS_VALUES = STATUS_VALUES;
