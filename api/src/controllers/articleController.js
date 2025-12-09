import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { prisma } from "../lib/prisma.js";
import { body, matchedData, query, validationResult } from "express-validator";
import CustomValidationError from "../errors/CustomValidationError.js";
import CustomNotFoundError from "../errors/CustomNotFoundError.js";

const validatePostArticle = [
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

const validateUpdateArticle = [
  body("title").optional()
    .isString()
    .trim(),
  body("content").optional()
    .isString()
    .trim(),
  body("published").optional()
    .trim()
    .isBoolean().toBoolean()
];

const validateGetArticleQuery = [
  query("title").optional().isString().trim(),
  query("author").optional().isInt().trim().toInt()
]

export const postArticle = [validatePostArticle, async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);

    try {
      await prisma.post.create({
        data:
        {
          title: data.title, content: data.content,
          published: data.published, author: { connect: { id: req.user.id } }
        }
      })
    } catch (err) {
      if (err instanceof PrismaClientValidationError) {
        throw new CustomValidationError("Could not create article");
      }

      throw err;
    }

    return res.status(201).json({ message: "Post created successfully" });
  }

  return res.send({ errors: result.array() });
}]

export const getArticles = [validateGetArticleQuery, async (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    const data = matchedData(req)

    try {
      const articles = await prisma.post.findMany({ where: { title: { contains: data.title }, author: { id: data.author } } });

      return res.status(200).json({ articles })
    } catch (err) {
      console.error(err)
      if (err instanceof PrismaClientValidationError) {
        throw new CustomValidationError("Invalid fields")
      }

      throw err;
    }
  }

  return res.status(400).json({ errors: result.array() });
}]

export const getArticleById = async (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    const data = matchedData(req)

    try {
      const article = await prisma.post.findUnique({ where: { id: data.id } })

      if (!article) {
        throw new CustomNotFoundError("Article not found")
      }

      return res.status(200).json({ article })
    } catch (err) {
      if (err instanceof PrismaClientValidationError) {
        throw new CustomValidationError("Invalid fields")
      }

      throw err;
    }
  }

  return res.status(400).json({ errors: result.array() });
}

export const deleteArticle = async (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    const data = matchedData(req)

    try {
      let article = await prisma.post.findUnique({ where: { id: data.id, author: { id: req.user.id } } })

      if (!article) {
        throw new CustomNotFoundError("Article not found")
      }

      await prisma.post.delete({ where: { id: data.id } })

      return res.status(200).json({ message: "Article deleted successfully", article })
    } catch (err) {
      if (err instanceof PrismaClientValidationError) {
        throw new CustomValidationError("Invalid fields")
      }

      throw err;
    }
  }

  return res.status(400).json({ errors: result.array() });
}

export const updateArticle = [validateUpdateArticle, async (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    const data = matchedData(req);

    try {
      let article = await prisma.post.findUnique({ where: { id: data.id, author: { id: req.user.id } } })

      if (!article) {
        throw new CustomNotFoundError("Article not found")
      }

      article = await prisma.post.update({
        where: { id: data.id },
        data:
        {
          title: data.title, content: data.content,
          published: data.published,
        }
      })

      return res.status(201).json({ message: "Post updated successfully", article });
    } catch (err) {
      console.error(err)
      if (err instanceof PrismaClientValidationError) {
        throw new CustomValidationError("Invalid fields");
      }

      throw err;
    }
  }

  return res.send({ errors: result.array() });
}]


