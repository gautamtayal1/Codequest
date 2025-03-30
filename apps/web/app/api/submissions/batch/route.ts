import { NextRequest, NextResponse } from "next/server"
import { getUserSession } from "@/lib/session"
import prisma from "@repo/db/config"
import { getProblems } from "@/lib/getProblems"
import axios from "axios"

export const LANGUAGE_MAPPING : {
  [key: string]: {
    judge0: number;
    internal: number;
    name: string;
    monaco: string
  }
} = {
  js: {judge0: 63, internal: 1, name: "Javascript", monaco: "javascript"},
  cpp: {judge0: 54, internal: 2, name: "C++", monaco: "cpp"}
}

export async function POST(req: NextRequest) {
  try {
    const {activeContestId, code, languageId, problemId} = await req.json()
    const user = await getUserSession()
    if(!user) {
      return NextResponse.json({messsage: "please login to continue"}, 
      {status: 401})
    }

    const dbProblem = await prisma.problem.findUnique({
      where: {id: problemId}
    })
    if (!dbProblem) {
      return NextResponse.json({message: 'problem not found'}, {status:404})
    }

    const problem = await getProblems(
      dbProblem.slug,
      languageId
    )
    
    const fullBoilerplateBuffer = await problem.fullBoilerplateCode
    const fullBoilerplateString = fullBoilerplateBuffer.toString()
    const updatedCode = fullBoilerplateString.replace(
      "// ##USER_CODE_HERE##",
      code
    )

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_JUDGE0_SERVER}/submissions/batch?base64_encoded=false`, {
        submissions: problem.inputs.map((input, index) => ({
          languageId: LANGUAGE_MAPPING[languageId]?.judge0,
          source_code: updatedCode,
          stdin: input,
          expected_output: problem.outputs[index],
          callback_url: process.env.JUDGE0_CALLBACK_URL ?? "http://16.170.202.59:2358/submission-callback"
        }))
      }
    )

    const submission = await prisma.submission.create({
      data: {
        userId: user.id,
        problemId: problemId,
        languageId: LANGUAGE_MAPPING[languageId] ? LANGUAGE_MAPPING[languageId].internal : 1,
        code: code,
        fullCode: updatedCode,
      }
    })

    const testCase = await Promise.all(
      response.data.map(async(SubmissionResult: any) => {
        const testCase = await prisma.testCase.create({
          data: {
            judge0TrackingId: SubmissionResult.token,
            submissionId: submission.id,
          }
        })
        return testCase
      })
    )
    return NextResponse.json({testCases: testCase, submissions: submission})

  } catch (error) {
    console.log(error)
    return NextResponse.json({error: "failed to submit judge0"}, {status: 500})
  }
}