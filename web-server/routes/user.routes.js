const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById
} = require('../controllers/user.controller');
const {
  register,
  signin,
  protectRoutes
} = require('../controllers/auth.controller');

const router = express.Router();

// authentication routes
router.route('/register').post(register);
router.route('/signin').post(signin);

// ADMIN ONLY (authenticated)
// TODO: CREATE MIDDLEWARES TO PROTECT AND RESTRICT THE ROUTES BASED ON USER ROLES
router
  .route('/')
  .get(protectRoutes, getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
