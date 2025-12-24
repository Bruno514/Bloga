import { redirect } from "react-router";
import { getUser } from "../services/userService.js";
import { userContext } from "../contexts/userContext.js";

const authMiddleware = async ({ context }) => {
  const user = await getUser();

  if (!user) {
    throw redirect("/login");
  }

  console.log(user);

  context.set(userContext, user);
}

export default authMiddleware;
