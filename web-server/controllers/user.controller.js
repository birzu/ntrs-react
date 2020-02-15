const User = require('../models/User.model');
const AppError = require('../utils/utils.AppError');
const {
  createOne,
  getAll,
  getOne,
  deleteOne
} = require('./_controller-wrappers');
const { catchAsyncError } = require('../utils/utils.functions');

// ADMIN ONLY
exports.createUser = createOne(User, { resourceName: 'user' });
exports.getAllUsers = getAll(User, { resourceName: 'users' });
exports.getUserById = getOne(User, { resourceName: 'user' });
exports.deleteUserById = deleteOne(User, { resourceName: 'user' });
// update user by id (restricted for manual use by admin only)
exports.updateUserById = catchAsyncError(async (req, res, next) => {
  // get the id from params
  const { id } = req.params;
  // get the updatable fields from body
  const { role } = req.body;
  if (!role)
    return next(
      new AppError(400, "Please provide a valid field to update 'role' ")
    );

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role },
    {
      new: true,
      runValidators: true
    }
  );
  // if no user found return with next call
  if (!updatedUser)
    return next(new AppError(404, `User with id ${id} not found`));
  // TODO: revoke accessTokens and refreshTokens if isActive set to false
  // on success return newly created user

  res.status(200).json({
    status: 'success',
    message: 'updated',
    data: {
      user: updatedUser
    }
  });
});
