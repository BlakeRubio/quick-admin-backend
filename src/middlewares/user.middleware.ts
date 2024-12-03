import UserSchema from '../validators/user';

const verifyUser = async (ctx, next) => {
  const user = ctx.request.body;
  const { error, value } = UserSchema.validate(user);
  const details = error?.details ? error.details : value
  console.log(details);
  // next();
};

export default verifyUser;
