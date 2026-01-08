import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { genPassword, validatePassword } from "../lib/auth/passwordUtils.js";
import { prisma } from "../lib/prisma.js";
import CustomNotFoundError from "../errors/CustomNotFoundError.js";
import CustomValidationError from "../errors/CustomValidationError.js";
import { matchedData } from "express-validator";
import CustomAuthorizationError from "../errors/CustomAuthorizationError.js";
import CustomAlreadyExistsError from "../errors/CustomAlreadyExistsError.js";

export async function getUser(req, res) {
  const id = req.user.id;

  let user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { role: true },
  });

  if (!user) {
    throw new CustomNotFoundError("User not found")
  }

  user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role.name,
  };

  return res.status(200).json({ user });
}

export async function getUserById(req, res) {
  const data = matchedData(req);

  let user = await prisma.user.findUnique({
    where: { id: data.id },
    include: { role: true },
  });

  if (!user) {
    throw new CustomNotFoundError("User not found")
  }

  user = {
    id: user.id,
    name: user.name,
    role: user.role.name,
  };

  return res.status(200).json({ user });
}

export const postUser = async (req, res) => {
  throw new Error("safdfas")
  const data = matchedData(req);

  let user = await prisma.user.findUnique({
    where: { email: data.email},
    include: { role: true },
  });

  if (user) {
    throw new CustomAlreadyExistsError("Email already in use")
  }

  if (data.password != data.confirmPassword) {
    throw new CustomValidationError("Passwords do not match");
  }

  const hashedPassword = await genPassword(data.password);

  try {
    await prisma.user.create({
      data: {
        name: data.username,
        email: data.email,
        password: hashedPassword,
        role: { connect: { name: "normal"} },
      },
    });
  } catch (err) {
    console.error(err)

    if (err instanceof PrismaClientValidationError) {
      throw new CustomValidationError("Invalid fields")
    }
    throw err;
  }

  return res.status(201).send({ message: "User created successfully" });
}

export const updateUser = async (req, res) => {
  const data = matchedData(req);

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  if (data.oldpassword) {
    const isValidPassword = await validatePassword(data.oldpassword, user.password)

    if (!isValidPassword) {
      throw new CustomAuthorizationError("Invalid old password")
    }

    let hashedPassword = undefined;

    hashedPassword = await genPassword(data.newpassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(201).send({ message: "User password update successfully" });
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.username,
        email: data.email,
        role: data.role ? { connect: { name: data.role } } : undefined,
      },
    });
  } catch (err) {
    console.error(err)
    if (err instanceof PrismaClientValidationError) {
      throw new CustomValidationError("Invalid fields")
    }

    throw err;
  }
  return res.status(200).send({ message: "User fields updated successfully" });
}

export const deleteUser = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  if (!user) {
    throw new CustomNotFoundError("User not found")
  }

  await prisma.comment.deleteMany({ where: { user: { id: req.user.id } } })
  await prisma.post.deleteMany({ where: { author: { id: req.user.id } } })
  await prisma.user.delete({ where: { id: req.user.id } })

  return res.status(200).send({ message: "User deleted successfully" });
}
