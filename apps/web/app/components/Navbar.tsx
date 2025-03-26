"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"

export const Navbar = () => {
  const session = useSession()

  return (
    <div>
      <h1 className="">LOGO</h1>
      <div>
        {session?.data?.user 
        ? 
          <Button onClick={() => {signOut()}}>Logout</Button>
        :
          <Button onClick={() => {signIn()}}>Login</Button>}
      </div>
    </div>
  )
}