import { Router } from "express";
import { postSession } from "../controllers/sessionController.js";

export const sessionRouter = Router();

sessionRouter.post("/", postSession);

export default sessionRouter;
