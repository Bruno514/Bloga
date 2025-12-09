import { Router } from "express";
import { getUser, postUser } from "../controllers/userController.js"
import passport from "passport";
import jwtStrategy from "../lib/auth/jwtStrategy.js";

passport.use(jwtStrategy)

const userRouter = Router();

userRouter.get("/:id", passport.authenticate("jwt", {session: false}), getUser);
userRouter.post("/", postUser);

export default userRouter;

