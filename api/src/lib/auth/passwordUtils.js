import bcrypt from "bcryptjs";

export async function genPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
}

export async function validatePassword(password, userPassword) {
  const result = await bcrypt.compare(password, userPassword);

  return result;
}
