import { body } from "express-validator";

export const postSessionValidator = [
  body("email").trim().notEmpty().withMessage("Must not be empty")
    .isLength({ min: 6, max: 60 }).withMessage("Needs to be between 6 and 60 characters"),//.isEmail("Not a valid email"),
  body("password").trim().notEmpty().withMessage("Must not be empty")
    .isLength({ min: 8, max: 25 }).withMessage("Needs to be between 8 and 25 characters"),
];

