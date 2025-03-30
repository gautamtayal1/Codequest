import { NextRequest } from "next/server"

import { getUserSession } from "@/lib/session"
import { NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    // const {activeContestId, code, languageId, problemId} = await req.json()
    console.log("Request Cookies:", req.cookies);
    console.log("Cookies:", req.headers.get("cookie"));

    const user = await getUserSession()
    if(!user) {
      return NextResponse.json({message: req.cookies}, 
      {status: 401})
    }
    return NextResponse.json({message: "success"}, 
    {status: 200})

  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "internal server error"}, 
    {status: 500})
  }
}