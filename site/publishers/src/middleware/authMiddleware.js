import { redirect } from "react-router";
import { userContext } from "@/contexts/userContext.js";
import { getUser } from "@/services/userService.js";

export async function authMiddleware({ context }) {
  const user = await getUser();

  if (!user) {
    throw redirect("/login");
  }

  context.set(userContext, user);
}

export async function profileLoader({ context }) {
  const user = context.get(userContext);

  return { ...user };
}

export default authMiddleware;
