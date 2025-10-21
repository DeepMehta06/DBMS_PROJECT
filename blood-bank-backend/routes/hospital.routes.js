const express = require('express');
const router = express.Router();
const {
  getAllHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital,
} = require('../controllers/hospitalController');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAuthorized = require('../middleware/isAuthorized');

// All routes require authentication
router.use(isAuthenticated);

// CRUD routes
router.route('/')
  .get(getAllHospitals)  // Accessible by staff and manager
  .post(isAuthorized('manager'), createHospital);  // Only manager can create

router.route('/:id')
  .get(getHospitalById)  // Accessible by staff and manager
  .put(isAuthorized('manager'), updateHospital)   // Only manager can update
  .delete(isAuthorized('manager'), deleteHospital);  // Only manager can delete

module.exports = router;
