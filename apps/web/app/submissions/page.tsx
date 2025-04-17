import { authOptions } from '@/api/auth/[...nextauth]/route';
import prisma from '@repo/db/config';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const SubmissionsPage = async() => {

  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if(!email) return

  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
    include: {
      submissions: {
        include: {
          testCases: true,
          problem: true
        }
      }
    }
  })
  console.log(user)
  const submissions = user?.submissions

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 pt-20">
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="relative">
          <div className="border-b border-indigo-500/20 bg-gray-900/40 backdrop-blur-sm">
            <div className="max-w-screen-2xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-semibold text-gray-100 mb-2 flex items-center space-x-4">
                <span>Your Submissions</span>
                <div className="px-3 py-1 bg-indigo-500/10 rounded-md text-sm text-indigo-400">
                  Total: {submissions?.length}
                </div>
              </h1>
            </div>
          </div>

          <div className="space-y-6 mt-6 flex flex-col gap-2">
            {submissions && submissions.length > 0 ? (
              submissions.map((submission) => (
                <Link href={`/problems/${submission.problem.id}`} key={submission.id}>
                  <div
                    key={submission.id}
                    className="relative group"
                  >
                    <div className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 p-6 hover:border-indigo-500/40 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <h2 className="text-xl font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors">
                            {submission.problem.title}
                          </h2>
                          <span
                            className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-400"
                          >
                            Easy
                          </span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {new Date(submission.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-black/40 p-4 rounded-md border border-indigo-500/20">
                          <div className="text-sm text-gray-400 mb-1">Status</div>
                          <div
                            className={`font-medium ${
                              submission.status === "AC"
                                ? "text-green-400"
                                : submission.status === "REJECTED"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {submission.status === "AC" ? "Accepted" : submission.status === "REJECTED" ? "Rejected" : "Time Limit Exceeded"}
                          </div>
                        </div>

                        <div className="bg-black/40 p-4 rounded-md border border-indigo-500/20">
                          <div className="text-sm text-gray-400 mb-1">Test Cases Passed</div>
                          <div className="font-medium text-gray-100">{(submission.testCases.filter((test) => test.status === "AC").length) + "/2"}</div>
                        </div>

                        <div className="bg-black/40 p-4 rounded-md border border-indigo-500/20">
                          <div className="text-sm text-gray-400 mb-1">Test Case 1</div>
                          <div
                            className={`font-medium ${
                              submission.testCases[0]?.status === "AC"
                                ? "text-green-400"
                                : submission.testCases[0]?.status === "FAIL"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {(() => {
                              switch (submission.testCases[0]?.status) {
                                case "AC":
                                  return "PASSED";
                                case "FAIL":
                                  return "FAILED";
                                default:
                                  return "-";
                              }
                            })()}
                          </div>
                        </div>

                        <div className="bg-black/40 p-4 rounded-md border border-indigo-500/20">
                          <div className="text-sm text-gray-400 mb-1">Test Case 2</div>
                          <div
                            className={`font-medium ${
                              submission.testCases[1]?.status === "AC"
                                ? "text-green-400"
                                : submission.testCases[1]?.status === "FAIL"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {(() => {
                              switch (submission.testCases[1]?.status) {
                                case "AC":
                                  return "PASSED";
                                case "FAIL":
                                  return "FAILED";
                                default:
                                  return "-";
                              }
                            })()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center space-x-4">
                        <div className="bg-indigo-500/10 px-3 py-1 rounded-md text-sm text-indigo-400">
                          {submission.languageId === 1 ? "JavaScript" : "C++"}
                        </div>
                        <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300 flex items-center group">
                          View Problem
                          <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-gray-400 text-lg mb-4">No submissions yet</div>
                <Link href="/problems" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  Start solving problems →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;