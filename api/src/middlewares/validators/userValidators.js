import { body, param, oneOf } from "express-validator"

export const getUserByIdValidator = [
  param("id").trim().isInt().toInt()
];

export const postUserValidator = [
  body("username")
    .trim()
    .optional()
    .isLength({ min: 6, max: 60 }),
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

export const updateUserValidator = [
  body("username")
    .trim()
    .optional()
    .isLength({ min: 6, max: 60 }),
  body("email")
    .trim()
    .optional()
    .isLength({ min: 6, max: 60 }),
  body("oldpassword")
    .trim()
    .optional()
    .isLength({ min: 8, max: 25 }),
  body("newpassword")
    .trim()
    .optional()
    .isLength({ min: 8, max: 25 }),
  oneOf(
    [
      body("role")
        .trim()
        .optional()
        .equals("normal"),
      body("role")
        .trim()
        .optional()
        .equals("publisher")
    ]
  )
]
