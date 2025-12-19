import { body } from "express-validator";

export const postSessionValidator = [
  body("email").trim().notEmpty()
    .isLength({ min: 6, max: 60 }),
  body("password").trim().notEmpty()
    .isLength({ min: 8, max: 25 }),
];

