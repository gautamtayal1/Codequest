import { promises as fs } from "fs"
import prisma from "../src/index.js"

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

async function main(problemSlug: string) {
  console.log("problem slug entered")
  const absolutePath = `/Users/apple/Desktop/my_projects/leetcode/apps/problems/${problemSlug}`
  const problemStatement = await fs.readFile(`${absolutePath}/Problem.md`, "utf8")

  console.log(problemStatement)

  const problem = await prisma.problem.upsert({
    where: { slug: problemSlug },
    create: {
      title: problemSlug,
      slug: problemSlug,
      description: problemStatement
    },
    update: {
      description: problemStatement
    }
  })

  console.log(problem)

  await Promise.all(
    Object.keys(LANGUAGE_MAPPING).map(async(language) => {
      if (!LANGUAGE_MAPPING[language]) return;
      console.log(language)
      const code = await fs.readFile(`${absolutePath}/boilerplate/function.${language}`, "utf8")
      console.log(code)
      await prisma.defaultCode.upsert({
        where: {
          languageId_problemId: {
            languageId: LANGUAGE_MAPPING[language].internal,
            problemId: problem.id
          }
        },
        create: {
          problemId: problem.id,
          languageId: LANGUAGE_MAPPING[language].internal,
          code
        },
        update: {code}
      })
      console.log("done")
    })
  )
}

main(process.env.PROBLEM_SLUG!)