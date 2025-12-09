import CustomForbiddenError from "../errors/CustomAuthorizationError.js";

const guard = {};

guard.isPublisher = function (req, res, next) {
  if (req.user.role === "normal") {
    throw new CustomForbiddenError("User is not a publisher")
  };

  next();
}

export default guard;
