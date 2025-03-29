import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(request: Request) {
  try {
    const {code} = await request.json()
    if(!code) {
      return NextResponse.json({error: "no code provided"}, {status: 400})
    }
    const judge0Response = await axios.post("http://16.170.202.59:2358/submissions", {
      source_code: code,
      language_id: 63,
      stdin: ""
    },
    {
      headers: { "Content-Type": "application/json" }, // Ensure proper headers
    })

    if (judge0Response.status !== 201) {
      throw new Error(`Judge0 request failed with status ${judge0Response}`)
    }

    const data = await judge0Response.data

    return NextResponse.json({token: data})
  } catch (error) {
    console.log(error)
    return NextResponse.json({error: "failed to submit judge0"}, {status: 500})
  }
}