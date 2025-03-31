import prisma from "@repo/db/config";
import express from "express";

const app = express();
app.use(express.json())

//@ts-ignore
app.put("/submission-callback", async (req: express.Request, res: express.Response) => {
  console.log("submission-callback executed")
  try {
    const data = req.body;

  const testCase = await prisma.testCase.update({
    where: {
      judge0TrackingId: data.token
    },
    data: {
      status: getStatus(data.status.description)
    }
  });
  if(!testCase) {
    return res.status(404).json({
      message: "Testcase not found"
    })
  }
  const allTestCases = await prisma.testCase.findMany({
    where: {
      submissionId: testCase.submissionId
    }
  })
  const pendingTestCases = allTestCases.filter((test) => test.status === "PENDING")
  const failedTestCases = allTestCases.filter((test) => test.status !== "AC")

  if(pendingTestCases.length === 0) {
    const accepted = failedTestCases.length === 0
    await prisma.submission.update({
      where: {
        id: testCase.submissionId,
      },
      data: {
        status: accepted ? "AC" : "REJECTED",
      },
      include: {
        problem: true
      }
    })
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false });
  }
})

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

function getStatus(status: string) {
  switch (status) {
    case "Accepted":
      return "AC";
    case "Wrong Answer":
      return "FAIL";
    case "Time Limit Exceeded":
      return "TLE";
    case "Compilation Error":
      return "COMPILE_ERROR";
    case "Runtime Error (NZEC)":
      return "FAIL";
    default:
      return "PENDING";
  }
}
