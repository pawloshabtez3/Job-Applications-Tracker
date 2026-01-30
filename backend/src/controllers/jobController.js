const mongoose = require('mongoose');
const Job = require('../models/Job');

const listJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ user: req.userId }).sort({ createdAt: -1 });
    return res.json({ jobs });
  } catch (err) {
    return next(err);
  }
};

const createJob = async (req, res, next) => {
  try {
    const { company, role, status, applicationDate, notes } = req.body;
    const job = await Job.create({
      company,
      role,
      status,
      applicationDate,
      notes,
      user: req.userId
    });
    return res.status(201).json({ job });
  } catch (err) {
    return next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid job id' });
    }

    const update = {
      company: req.body.company,
      role: req.body.role,
      status: req.body.status,
      applicationDate: req.body.applicationDate,
      notes: req.body.notes
    };

    const job = await Job.findOneAndUpdate({ _id: id, user: req.userId }, update, {
      new: true,
      runValidators: true
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.json({ job });
  } catch (err) {
    return next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid job id' });
    }

    const job = await Job.findOneAndDelete({ _id: id, user: req.userId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.json({ message: 'Job deleted' });
  } catch (err) {
    return next(err);
  }
};

module.exports = { listJobs, createJob, updateJob, deleteJob };
