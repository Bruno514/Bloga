import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { genPassword } from "../lib/auth/passwordUtils.js";
import { prisma } from "../lib/prisma.js";
import CustomNotFoundError from "../errors/CustomNotFoundError.js";
import CustomValidationError from "../errors/CustomValidationError.js";
import { body, oneOf } from "express-validator";

const validatePostUser = [
  body("username"),
  body("email")
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 60 }),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8, max: 25 }),
  oneOf(
    [
      body("role")
        .trim()
        .notEmpty()
        .equals("normal"),
      body("role")
        .trim()
        .notEmpty()
        .equals("publisher")
    ]
  )
]

export async function getUser(req, res) {
  const { id } = req.params;

  let user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { role: true },
  });

  if (!user) {
    throw new CustomNotFoundError("User not found")
  }

  user = {
    id: user.id,
    name: user.name,
    user: user.email,
    role: user.role.name,
  };

  return res.status(200).json({ user });
}

export const postUser = [validatePostUser, async (req, res) => {
  const { username, email, password, role } = req.body;

  const hashedPassword = await genPassword(password);

  try {
    await prisma.user.create({
      data: {
        name: username,
        email: email || null,
        password: hashedPassword,
        role: { connect: { name: role } },
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      throw new CustomValidationError("Invalid fields")
    }

    throw err;
  }

  return res.status(201).send({ message: "User created successfully" });
}]

export const updateUser = [async (req, res) => {
  const { username, email, password, role } = req.body;

  const hashedPassword = await genPassword(password);

  try {
    await prisma.user.create({
      data: {
        name: username,
        email: email || null,
        password: hashedPassword,
        role: { connect: { name: role } },
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      throw new CustomValidationError("Invalid fields")
    }

    throw err;
  }

  return res.status(201).send({ message: "User created successfully" });
}]
