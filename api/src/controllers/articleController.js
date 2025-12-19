import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { prisma } from "../lib/prisma.js";
import { matchedData } from "express-validator";
import CustomValidationError from "../errors/CustomValidationError.js";
import CustomNotFoundError from "../errors/CustomNotFoundError.js";

export const postArticle = async (req, res) => {
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

export const getArticles = async (req, res) => {
  const data = matchedData(req)

  try {
    const articles = await prisma.post.findMany({ where: { title: { contains: data.title }, author: { id: data.author } }, include: { comments: true } });

    return res.status(200).json({ articles })
  } catch (err) {
    console.error(err)
    if (err instanceof PrismaClientValidationError) {
      throw new CustomValidationError("Invalid fields")
    }

    throw err;
  }
}

export const getArticleById = async (req, res) => {
  const data = matchedData(req)

  try {
    const article = await prisma.post.findUnique({ where: { id: data.id }, include: { comments: true } })

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

export const deleteArticle = async (req, res) => {
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

export const updateArticle = async (req, res) => {
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

    return res.status(200).json({ message: "Post updated successfully", article });
  } catch (err) {
    console.error(err)
    if (err instanceof PrismaClientValidationError) {
      throw new CustomValidationError("Invalid fields");
    }

    throw err;
  }
}

export const postComment = async (req, res) => {
  const data = matchedData(req);

  try {
    const article = prisma.post.findUnique({ where: { id: data.id } })

    if (!article) {
      throw new CustomNotFoundError("Article not found")
    }

    await prisma.comment.create({
      data: {
        content: data.content,
        post: {
          connect: { id: data.id }
        },
        user: {
          connect:
            { id: req.user.id }
        },
      }
    })
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      console.error(err)

      throw new CustomValidationError("Could not create comment");
    }

    throw err;
  }

  return res.status(201).json({ message: "Comment created successfully" });
}

export const postReply = async (req, res) => {
  const data = matchedData(req);

  try {
    const article = prisma.post.findUnique({ where: { id: data.articleId } })

    if (!article) {
      throw new CustomNotFoundError("Article not found")
    }

    await prisma.comment.create({
      data: {
        content: data.content,
        post: {
          connect: { id: data.articleId }
        },
        user: {
          connect:
            { id: req.user.id }
        },
        parent: {
          connect:
            { id: data.commentId }
        }
      }
    })
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      console.error(err)

      throw new CustomValidationError("Could not create comment");
    }

    throw err;
  }

  return res.status(201).json({ message: "Comment created successfully" });
}

export const updateComment = async (req, res) => {
  const data = matchedData(req);

  try {
    const article = await prisma.post.findUnique({ where: { id: data.articleId } })

    if (!article) {
      throw new CustomNotFoundError("Article not found")
    }

    const comment = await prisma.comment.findUnique({ where: { id: data.commentId } })

    if (!comment) {
      throw new CustomNotFoundError("Comment not found")
    }

    await prisma.comment.update({
      where: { id: data.commentId, post: { id: data.articleId }, user: { id: req.user.id } },
      data: {
        content: data.content,
      }
    })
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      console.error(err)

      throw new CustomValidationError("Could not update comment");
    }

    throw err;
  }

  return res.status(201).json({ message: "Comment update successfully" });
}

export const deleteComment = async (req, res) => {
  const data = matchedData(req);

  try {
    const article = await prisma.post.findUnique({ where: { id: data.articleId } })

    if (!article) {
      throw new CustomNotFoundError("Article not found")
    }

    const comment = prisma.comment.findUnique({ where: { id: data.commentId } })

    if (!comment) {
      throw new CustomNotFoundError("Comment not found")
    }

    await prisma.comment.delete({
      where: { id: data.commentId, post: { id: data.articleId }, OR: [{ user: { id: req.user.id } }, { user: { id: article.authorId } }] },
    })
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      console.error(err)

      throw new CustomValidationError("Could not delete comment");
    }

    throw err;
  }

  return res.status(201).json({ message: "Comment deleted successfully" });
}
