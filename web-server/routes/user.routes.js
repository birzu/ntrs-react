const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getMyProfile
} = require('../controllers/user.controller');
const {
  register,
  signin,
  signOut,
  protectRoutes,
  onForgotPassword,
  onResetPassword,
  resetPassword
} = require('../controllers/auth.controller');

const router = express.Router();

// authentication routes
router.route('/register').post(register);
router.route('/signin').post(signin);
router.route('/signout').get(protectRoutes, signOut);

router.route('/me').get(protectRoutes, getMyProfile);
router.route('/me/forgotpassword').post(onForgotPassword);
router.route('/me/resetpassword/:token').post(onResetPassword, resetPassword);

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
