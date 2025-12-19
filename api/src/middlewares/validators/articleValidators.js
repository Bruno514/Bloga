import { body, param, query } from "express-validator"

export const getArticlesValidator = [
  query("title").optional().isString().trim(),
  query("author").optional().isInt().trim().toInt()
]

export const getArticleByIdValidator = [
  param("id").trim().isInt().toInt()
];

export const postArticleValidator = [
  body("title").notEmpty()
    .trim()
    .isString()
    .isLength({ min: 1, max: 240 }),
  body("content").notEmpty()
    .trim()
    .isString()
    .isLength({ min: 1, max: 2048 }),
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
