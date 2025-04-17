import { User, getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const session = async({session, token}: {session: any, token: any}) => {
  session.user.id = token.id
  return session
}

export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession(authOptions)
  return authUserSession?.user as User
}
