import { NextResponse } from "next/server"
import axios from "axios"
import { getUserSession } from "@/lib/session"
import prisma from "@repo/db/config"

export async function POST(request: Request) {
  try {
    const { user } = await getUserSession()
    const {problem_id, language_id, code, contest_id, contest_problem_id} = await request.json()

    const problem = await prisma.problem.findUnique({
      where: {
        id: problem_id as string
      }
    })

    if(!problem) {
      return NextResponse.json({error: "problem not found"}, {status: 404})
    }

    const input = ["1 2", "3 4", "0 0"]
    const output = ["3", "7", "0"]
    const fullCode = `
      ${code}
      process.stdin.on('data', (data) => {
      cosnt [a, b] = data.toString().trim().split(' ').map(Number);
      console.log(sum(a, b))}
    `

    const judge0Response = await axios.post(`${process.env.NEXT_PUBLIC_JUDGE_API_BASE_URL}/submissions/batch`, {
      submissions: input.map((input, index) => ({
        source_code: code,
        language_id: 63,
        stdin: input,
        expected_output: output[index],
        callback_url: `${process.env.NEXT_PUBLIC_CALLBACK_URL}/submission-callback`
      }))
    },
    {
      params: {base64_encoded: "false"},
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      }
    })

    const submissionData: any = {
      problemId: problem_id as string,
      languageId: language_id as number,
      code: code as string,
      userId: user?.id as string,
      status: "PENDING",
      fullCode: fullCode as string
    }

    if(contest_id) {
      const contest = await prisma.contest.findUnique({
        where: {id: contest_id}
      })
      if(contest) {
        submissionData.contestId = contest_id
        if(contest_id && problem_id) {
          const contestProblem = await prisma.contestProblem.findUnique({
            where: {
              contestId_problemId
            }
          })
        }
      }
    } 

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