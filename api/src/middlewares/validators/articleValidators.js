import { body, param, query } from "express-validator"

export const getArticlesValidator = [
  query("title").optional().isString().trim(),
  query("author").optional().isInt().trim().toInt()
]

export const getArticleByIdValidator = [
  param("id").trim().isInt().toInt()
];

export const postArticleValidator = [
  body("title").notEmpty().withMessage("Title is required")
    .trim()
    .isString().withMessage("Title must contain letters")
    .isLength({ min: 1, max: 240 }).withMessage("Title must be between 1 and 240 characters."),

  body("content").notEmpty().withMessage("Post text is required")
    .trim()
    .isString().withMessage("Post text must contain letters")

    .isLength({ min: 1, max: 2048 }).withMessage("Post text must be between 1 and 2048 characters."),
  body("published").trim().notEmpty().toBoolean()
];

export const updateArticleValidator = [
  param("id").trim().isInt().toInt(),
  body("title").optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 240 }),
  body("content").optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 2048 }),
  body("published").optional()
    .trim()
    .isBoolean().toBoolean()
];

export const deleteArticleValidator = [
  param("id").trim().isInt().toInt()
];

export const postCommentValidator = [
  param("id").trim().isInt().toInt(),
  body("content").notEmpty()
    .trim()
    .isString()
    .isLength({ min: 1, max: 1048 }),
]

export const postReplyValidator = [
  param("articleId").trim().isInt().toInt(),
  param("commentId").trim().isInt().toInt(),
  body("content").notEmpty()
    .trim()
    .isString()
    .isLength({ min: 1, max: 1048 }),
]

export const updateCommentValidator = [
  param("articleId").trim().isInt().toInt(),
  param("commentId").trim().isInt().toInt(),
  body("content").optional()
    .trim()
    .isString()
    .isLength({ min: 1, max: 1048 }),
]

export const deleteCommentValidator = [
  param("articleId").trim().isInt().toInt(),
  param("commentId").trim().isInt().toInt(),
]
