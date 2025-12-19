import { Router } from "express";
import { deleteArticle, deleteComment, getArticleById, getArticles, postArticle, postComment, postReply, updateArticle, updateComment } from "../controllers/articleController.js";
import passport from "passport";
import jwtStrategy from "../lib/auth/jwtStrategy.js";
import guard from "../middlewares/guardMiddleware.js";
import { deleteArticleValidator, deleteCommentValidator, getArticleByIdValidator, getArticlesValidator, postArticleValidator, postCommentValidator, postReplyValidator, updateArticleValidator, updateCommentValidator } from "../middlewares/validators/articleValidators.js";
import requestValidationMiddleware from "../middlewares/requestValidationMiddleware.js";

passport.use(jwtStrategy)

const articleRouter = Router();

articleRouter.use(passport.authenticate("jwt", { session: false }))

// Post routes
articleRouter.get("/", getArticlesValidator, requestValidationMiddleware, getArticles);
articleRouter.get("/:id", getArticleByIdValidator, requestValidationMiddleware, getArticleById);
articleRouter.post("/", guard.isPublisher, postArticleValidator, requestValidationMiddleware, postArticle);
articleRouter.patch("/:id", guard.isPublisher, updateArticleValidator, requestValidationMiddleware, updateArticle);
articleRouter.delete("/:id", guard.isPublisher, deleteArticleValidator, requestValidationMiddleware, deleteArticle);

// Comment routes
articleRouter.post("/:id/comment", postCommentValidator, requestValidationMiddleware, postComment)
articleRouter.post("/:articleId/comment/:commentId", postReplyValidator, requestValidationMiddleware, postReply)
articleRouter.patch("/:articleId/comment/:commentId", updateCommentValidator, requestValidationMiddleware, updateComment)
articleRouter.delete("/:articleId/comment/:commentId", deleteCommentValidator, requestValidationMiddleware, deleteComment)

export default articleRouter;

