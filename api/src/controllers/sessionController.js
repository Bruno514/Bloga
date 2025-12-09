import "dotenv/config";
import { validatePassword } from "../lib/auth/passwordUtils.js";
import { default as jwt } from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import CustomNotFoundError from "../errors/CustomNotFoundError.js";
import { body, validationResult, matchedData } from "express-validator";

const bodyValidateSession = [
  body("email").trim().notEmpty()
    .isLength({ min: 6, max: 60 }),
  body("password").trim().notEmpty()
    .isLength({ min: 8, max: 25}),
];


export const postSession = [bodyValidateSession, async function postSession(req, res) {
  const result = validationResult(req);

  if (result.isEmpty()) {
    const data = matchedData(req);

    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      throw new CustomNotFoundError("User not found");
    }

    const isPasswordValid = await validatePassword(data.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const opts = {};
    opts.expiresIn = 60 * 60 * 24 * 30; //token expires in 30 days 
    const secret = process.env.SECRET_KEY;
    const token = jwt.sign({ id: user.id }, secret, opts);

    return res.status(200).json({ message: "Authentication succeed", token });
  }
}]
