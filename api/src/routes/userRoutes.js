import { Router } from "express";
import { deleteUser, getUser, getUserById, postUser, updateUser } from "../controllers/userController.js"
import passport from "passport";
import jwtStrategy from "../lib/auth/jwtStrategy.js";
import { getUserByIdValidator, postUserValidator, updateUserValidator } from "../middlewares/validators/userValidators.js";
import requestValidationMiddleware from "../middlewares/requestValidationMiddleware.js";

passport.use(jwtStrategy)

const userRouter = Router();

userRouter.get("/", requestValidationMiddleware, passport.authenticate("jwt", { session: false }), getUser);
userRouter.get("/:id", getUserByIdValidator, requestValidationMiddleware, passport.authenticate("jwt", { session: false }), getUserById);
userRouter.post("/", postUserValidator, requestValidationMiddleware, postUser);
userRouter.patch("/", updateUserValidator, requestValidationMiddleware, passport.authenticate("jwt", { session: false }), updateUser);
userRouter.delete("/", passport.authenticate("jwt", { session: false }), deleteUser);

export default userRouter;

