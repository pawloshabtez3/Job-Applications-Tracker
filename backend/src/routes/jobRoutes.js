const express = require('express');
const { body } = require('express-validator');
const { listJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const auth = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const { STATUS_VALUES } = require('../models/Job');

const router = express.Router();

const jobValidators = [
  body('company').notEmpty().withMessage('Company is required'),
  body('role').notEmpty().withMessage('Role is required'),
  body('status').optional().isIn(STATUS_VALUES).withMessage('Invalid status'),
  body('applicationDate').optional().isISO8601().toDate(),
  body('notes').optional().isString()
];

router.get('/', auth, listJobs);
router.post('/', auth, jobValidators, validateRequest, createJob);
router.put('/:id', auth, jobValidators, validateRequest, updateJob);
router.delete('/:id', auth, deleteJob);

module.exports = router;
