import { Router } from "express";
import { deleteArticle, getArticleById, getArticles, postArticle, updateArticle } from "../controllers/articleController.js";
import passport from "passport";
import jwtStrategy from "../lib/auth/jwtStrategy.js";
import { param } from "express-validator";
import guard from "../middlewares/guardMiddleware.js";

const paramValidate = [
  param("id").trim().toInt()
    .isInt()
];

passport.use(jwtStrategy)

const articleRouter = Router();

articleRouter.use(passport.authenticate("jwt", { session: false }))

articleRouter.get("/", getArticles);
articleRouter.get("/:id", paramValidate, getArticleById);
articleRouter.post("/", guard.isPublisher, postArticle);
articleRouter.patch("/:id", paramValidate, guard.isPublisher, updateArticle);
articleRouter.delete("/:id", paramValidate, guard.isPublisher, deleteArticle);

export default articleRouter;

