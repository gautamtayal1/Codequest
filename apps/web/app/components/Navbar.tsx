"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"


export const Navbar = () => {
  const {data: session} = useSession()

  return (
    <div className="flex justify-between items-center p-3 bg-[#282a36] text-white">
      <h1 className="">LOGO</h1>
      <div>
        {session?.user 
        ? 
        <div className="flex items-center gap-3">
          <p>Welcome, {session?.user?.name}</p>
          <Button onClick={() => {signOut()}}>Logout</Button>
        </div>
          
        :
          <Button onClick={() => {signIn()}}>Login</Button>}
      </div>
    </div>
  )
}
