import prisma from "@repo/db/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { submissionId } = await req.json()

  if (!submissionId) {
    return NextResponse.json({error: "Submission id invalid"})
  }

  const submission = await prisma.submission.findUnique({
    where: {
      id: submissionId
    } ,
    include: {
      testCases: true
    }
  })
    return NextResponse.json({ submission: submission });
  } catch (error) {
    console.error("Error in submission callback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}